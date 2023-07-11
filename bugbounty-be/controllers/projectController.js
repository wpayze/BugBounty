const Project = require("../models/project");
const Bug = require("../models/bug");
const Attachment = require("../models/attachment");

const fs = require("fs");
const path = require("path");

exports.getAllProjects = async (req, res) => {
  const { companyId } = req.user;

  try {
    const projects = await Project.find({ company: companyId });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting projects" });
  }
};

exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { companyId } = req.user;

  try {
    const project = await Project.findOne({
      _id: projectId,
      company: companyId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error getting project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the project" });
  }
};

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const { userId } = req.user;
  let attachments = [];

  const coverImageFile = req.files.find(
    (file) => file.fieldname === "coverImage"
  );
  const coverImage = coverImageFile ? coverImageFile.path : null;

  if (req.body.attachments) {
    for (let file of req.body.attachments) {
      if (file.fieldname !== "coverImage") {
        let attachment = new Attachment(file);
        await attachment.save();
        attachments.push(attachment._id);
      }
    }
  }

  try {
    const newProject = await Project.create({
      name,
      description,
      creator: userId,
      coverImage,
      attachments,
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the project" });
  }
};

exports.updateProjectById = async (req, res) => {
  const { projectId } = req.params;
  const updateData = { ...req.body };
  const { companyId } = req.user;
  const newCoverImage = req.files.find(
    (file) => file.fieldname === "coverImage"
  );
  const newAttachments = req.files.filter(
    (file) => file.fieldname !== "coverImage"
  );

  if (newCoverImage) {
    updateData.coverImage = newCoverImage.path;
  }

  try {
    // Buscamos el proyecto a actualizar
    const project = await Project.findOne({
      _id: projectId,
      company: companyId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Encontramos y eliminamos los attachments antiguos que no se enviaron en el update
    const oldAttachmentIds = project.attachments;
    const newAttachmentIds = updateData.attachments || [];
    const attachmentsToDelete = oldAttachmentIds.filter(
      (id) => !newAttachmentIds.includes(id)
    );

    for (let attachmentId of attachmentsToDelete) {
      const attachment = await Attachment.findById(attachmentId);
      if (attachment) {
        // Borramos el archivo del sistema de archivos
        fs.unlink(path.join(__dirname, attachment.url), (err) => {
          if (err) console.error("Error deleting file:", err);
        });

        // Borramos el attachment de la base de datos
        await Attachment.findByIdAndRemove(attachmentId);
      }
    }

    // Agregamos los nuevos attachments
    if (newAttachments.length) {
      const newAttachmentsData = newAttachments.map((file) => ({
        url: file.path,
        name: file.originalname,
        type: file.mimetype,
      }));
      const createdAttachments = await Attachment.insertMany(
        newAttachmentsData
      );
      updateData.attachments = [
        ...newAttachmentIds,
        ...createdAttachments.map((attachment) => attachment._id),
      ];
    }

    // Actualizamos el proyecto
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the project" });
  }
};

exports.deleteProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { companyId } = req.user;

  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      company: companyId,
    });
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Bug.deleteMany({ project: projectId });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the project" });
  }
};
