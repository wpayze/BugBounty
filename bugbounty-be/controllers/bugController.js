const fs = require('fs');
const path = require('path');

const Project = require('../models/project');
const Bug = require('../models/bug');
const Comment = require('../models/comment');
const User = require('../models/user');
const ChangeEvent = require('../models/changeEvent');
const Attachment = require('../models/attachment');

const uploadFiles = require('../helpers/fileUploader');

function parseJSONField(field, errorMessage) {
  if (typeof field === 'string') {
    try {
      return field ? JSON.parse(field) : [];
    } catch (error) {
      console.error(errorMessage, error);
      throw new Error('Invalid JSON format');
    }
  }
  return field;
}

exports.getAllBugs = async (req, res, next) => {
  try {
    const { companyId } = req.user;

    const companyUsers = await User.find({ company: companyId });
    const userIds = companyUsers.map((user) => user._id);

    const projectsWithBugCounts = await Project.aggregate([
      {
        $match: { creator: { $in: userIds } },
      },
      {
        $lookup: {
          from: 'bugs',
          localField: '_id',
          foreignField: 'project',
          as: 'bugs',
        },
      },
      {
        $project: {
          name: 1,
          bugCount: { $size: '$bugs' },
          bugs: {
            $map: {
              input: '$bugs',
              as: 'bug',
              in: {
                _id: '$$bug._id',
                customId: '$$bug.customId',
                title: '$$bug.title',
                status: '$$bug.status',
                severity: '$$bug.severity',
                assignees: '$$bug.assignees',
                attachments: { $size: '$$bug.attachments' },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(projectsWithBugCounts);
  } catch (err) {
    next(err);
  }
};

exports.getBugById = async (req, res) => {
  const { bugId } = req.params;
  const { companyId } = req.user;

  try {
    const bug = await Bug.findById(bugId).populate('creator attachments');
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    if (bug.creator.company.toString() !== companyId) {
      return res.status(403).json({
        message: 'Forbidden: Bug does not belong to your company',
      });
    }

    const comments = await Comment.find({ bug: bugId }).populate('creator').sort({ _id: -1 });
    const events = await ChangeEvent.find({ bug: bugId }).populate('user').sort({ _id: -1 });

    const result = {
      ...bug._doc,
      comments,
      events,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting bug:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting the bug' });
  }
};

exports.getBugsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const bugs = await Bug.find({ project: projectId });

    if (!bugs.length) {
      return res
        .status(404)
        .json({ message: 'No bugs found for this project' });
    }

    res.status(200).json(bugs);
  } catch (error) {
    console.error('Error getting bugs:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting the bugs' });
  }
};

exports.createBug = async (req, res) => {
  const { userId } = req.user;

  try {
    const bodyAttachments = await uploadFiles(req, res);
    const user = await User.findById(userId);
    let { title, description, project, assignees, severity } = req.body;

    try {
      assignees = parseJSONField(assignees, 'Error parsing assignees string:');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    const attachmentPromises = bodyAttachments.map((attachmentData) =>
      new Attachment(attachmentData).save()
    );
    const attachments = await Promise.all(attachmentPromises);

    const newBug = await Bug.create({
      customId: null,
      title,
      description,
      status: 'open',
      creator: userId,
      project,
      assignees,
      severity,
      attachments: attachments.map((attachment) => attachment._id),
    });

    ChangeEvent.create({
      type: 'creation',
      user: userId,
      bug: newBug._id,
      timestamp: new Date(),
      details: `Bug "${title}" created by ${user.name} (${user.email})`,
    });

    res.status(201).json(newBug);
  } catch (error) {
    console.error('Error creating bug:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while creating the bug' });
  }
};

exports.updateBugById = async (req, res) => {
  const { bugId } = req.params;
  const { userId, companyId } = req.user;

  try {
    const bug = await Bug.findById(bugId).populate('creator');
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    if (bug.creator.company.toString() !== companyId) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Bug does not belong to your company' });
    }

    const newAttachmentsData = await uploadFiles(req, res);
    const newAttachmentsPromises = newAttachmentsData.map((attachmentData) =>
      new Attachment(attachmentData).save()
    );
    const newAttachments = await Promise.all(newAttachmentsPromises);

    let {
      title,
      description,
      status,
      assignees,
      severity,
      attachments: updatedAttachmentIds,
    } = req.body;

    try {
      updatedAttachmentIds = parseJSONField(
        updatedAttachmentIds,
        'Error parsing attachments string:'
      );
      assignees = parseJSONField(assignees, 'Error parsing assignees string:');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    const oldAttachmentIds = bug.attachments;
    const attachmentsToDelete = oldAttachmentIds.filter(
      (id) => !updatedAttachmentIds.includes(id.toString())
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

    const validAttachments = [
      ...newAttachments.map((attachment) => attachment._id),
      ...updatedAttachmentIds,
    ];

    const updatedBug = await Bug.findByIdAndUpdate(
      bugId,
      {
        title,
        description,
        status,
        assignees,
        severity,
        attachments: validAttachments,
      },
      { new: true }
    );

    const user = await User.findById(userId);

    ChangeEvent.create({
      type: 'modification',
      user: userId,
      bug: updatedBug._id,
      timestamp: new Date(),
      details: `Bug "${title}" updated by ${user.name} (${user.email})`,
    });

    res.status(200).json(updatedBug);
  } catch (error) {
    console.error('Error updating bug:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the bug' });
  }
};
