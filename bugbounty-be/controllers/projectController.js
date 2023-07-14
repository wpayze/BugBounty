const fs = require('fs');
const path = require('path');
const Project = require('../models/project');
const Bug = require('../models/bug');
const Attachment = require('../models/attachment');
const User = require('../models/user');

exports.getAllProjects = async (req, res) => {
  const { companyId } = req.user;

  try {
    const companyUsers = await User.find({ company: companyId });
    const userIds = companyUsers.map((user) => user._id);
    const projects = await Project.find({
      creator: { $in: userIds },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting projects' });
  }
};

exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { companyId } = req.user;

  try {
    const project = await Project.findById(projectId).populate('creator');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.creator.company.toString() !== companyId) {
      return res.status(403).json({
        message: 'Forbidden: Project does not belong to your company',
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting the project' });
  }
};

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const { userId } = req.user;
  const attachments = [];

  const coverImageFile = req.files.find(
    (file) => file.fieldname === 'coverImage',
  );
  const coverImage = coverImageFile ? coverImageFile.path : null;

  if (req.body.attachments) {
    for (const file of req.body.attachments) {
      if (file.fieldname !== 'coverImage') {
        const attachment = new Attachment(file);
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
    console.error('Error creating project:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while creating the project' });
  }
};

exports.updateProjectById = async (req, res) => {
  const { projectId } = req.params;
  const updateData = { ...req.body };
  const { companyId } = req.user;
  const newCoverImage = req.files.find(
    (file) => file.fieldname === 'coverImage',
  );
  const newAttachments = req.body.attachments || [];

  if (typeof updateData.currentAttachments === 'string') {
    try {
      updateData.currentAttachments = updateData.currentAttachments ? JSON.parse(updateData.currentAttachments) : [];
    } catch (error) {
      console.error('Error parsing attachments string:', error);
      return res.status(400).json({ message: 'Invalid attachments data' });
    }
  }

  try {
    const project = await Project.findById(projectId).populate('creator');

    if (newCoverImage) {
      if (project.coverImage) {
        fs.unlink(project.coverImage, (err) => {
          if (err) {
            console.error('Error deleting old cover image:', err);
          }
        });
      }

      updateData.coverImage = newCoverImage.path;
    }

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.creator.company.toString() !== companyId) {
      return res.status(403).json({
        message: 'Forbidden: Project does not belong to the same company',
      });
    }

    const oldAttachmentIds = project.attachments;
    const updatedAttachmentIds = updateData.currentAttachments || [];
    const attachmentsToDelete = oldAttachmentIds.filter(
      (id) => !updatedAttachmentIds.includes(id.toString()),
    );
    for (const attachmentId of attachmentsToDelete) {
      const attachment = await Attachment.findById(attachmentId);
      if (attachment) {
        fs.unlink(attachment.url, (err) => {
          if (err) console.error('Error deleting file:', err);
        });

        await Attachment.findByIdAndRemove(attachmentId);
      }
    }

    if (newAttachments.length) {
      for (const file of newAttachments) {
        if (file.fieldname !== 'coverImage') {
          const attachment = new Attachment(file);
          await attachment.save();
          updatedAttachmentIds.push(attachment._id);
        }
      }
    }

    updateData.attachments = updatedAttachmentIds;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true },
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the project' });
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
      return res.status(404).json({ message: 'Project not found' });
    }

    await Bug.deleteMany({ project: projectId });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the project' });
  }
};
