const fs = require('fs');
const path = require('path');

const Project = require('../models/project');
const Bug = require('../models/bug');
const Attachment = require('../models/attachment');
const User = require('../models/user');
const ChangeEvent = require('../models/changeEvent');
const Comment = require('../models/comment');

const uploadFiles = require('../helpers/fileUploader');

exports.getAllProjects = async (req, res) => {
  const { companyId } = req.user;

  try {
    const companyUsers = await User.find({ company: companyId });
    const userIds = companyUsers.map((user) => user._id);
    const projects = await Project.find({
      creator: { $in: userIds },
    }).populate("creator");
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
  const bodyAttachments = await uploadFiles(req, res);
  const { userId } = req.user;
  const attachments = [];
  const { name, description } = req.body;

  const coverImageFile = bodyAttachments.find(
    (file) => file.fieldname === 'coverImage',
  );
  const coverImage = coverImageFile ? coverImageFile.url : null;

  if (bodyAttachments) {
    for (const file of bodyAttachments) {
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
  const { companyId } = req.user;

  try {
    const project = await Project.findById(projectId).populate('creator');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const bodyAttachments = await uploadFiles(req, res);
    const updateData = { ...req.body };

    if (typeof updateData.currentAttachments === 'string') {
      try {
        updateData.currentAttachments = updateData.currentAttachments
          ? JSON.parse(updateData.currentAttachments)
          : [];
      } catch (error) {
        console.error('Error parsing attachments string:', error);
        return res.status(400).json({ message: 'Invalid attachments data' });
      }
    }

    const newAttachments = bodyAttachments || [];

    const newCoverImage = bodyAttachments.find(
      (file) => file.fieldname === 'coverImage',
    );

    if (newCoverImage) {
      if (project.coverImage) {
        fs.unlink(path.join(__dirname, '../uploads', project.coverImage), (err) => {
          if (err) {
            console.error('Error deleting old cover image:', err);
          }
        });
      }

      updateData.coverImage = newCoverImage.url;
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
        fs.unlink(path.join(__dirname, '../uploads', attachment.url), (err) => {
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
    const project = await Project.findById(projectId).populate('creator');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.creator.company.toString() !== companyId) {
      return res.status(403).json({
        message: 'Forbidden: Project does not belong to your company',
      });
    }

    const bugs = await Bug.find({ project: projectId });

    for (const bug of bugs) {
      for (const attachmentId of bug.attachments) {
        const attachment = await Attachment.findById(attachmentId);
        if (attachment) {
          fs.unlink(path.join(__dirname, '../uploads', attachment.url), (err) => {
            if (err) console.error('Error deleting file:', err);
          });
          await Attachment.findByIdAndRemove(attachmentId);
        }
      }

      await Comment.deleteMany({ bug: bug._id });
      await ChangeEvent.deleteMany({ bug: bug._id });
    }

    await Bug.deleteMany({ project: projectId });
    await Project.deleteOne({ _id: projectId });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the project' });
  }
};
