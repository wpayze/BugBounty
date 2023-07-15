const Bug = require('../models/bug');
const User = require('../models/user');
const ChangeEvent = require('../models/changeEvent');
const Attachment = require('../models/attachment');

const uploadFiles = require('../helpers/fileUploader');

exports.getAllBugs = async (req, res, next) => {
  try {
    const { companyId } = req.user;
    const companyUsers = await User.find({ company: companyId });
    const userIds = companyUsers.map((user) => user._id);
    const bugs = await Bug.find({ creator: { $in: userIds } });
    res.status(200).json(bugs);
  } catch (err) {
    next(err);
  }
};

exports.getBugById = async (req, res) => {
  const { bugId } = req.params;
  const { companyId } = req.user;

  try {
    const bug = await Bug.findById(bugId).populate('creator');
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    if (bug.creator.company.toString() !== companyId) {
      return res.status(403).json({
        message: 'Forbidden: Bug does not belong to your company',
      });
    }

    res.status(200).json(bug);
  } catch (error) {
    console.error('Error getting bug:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting the bug' });
  }
};

exports.createBug = async (req, res) => {
  const { userId } = req.user;

  try {
    const bodyAttachments = await uploadFiles(req, res);
    const user = User.findById(userId);

    const {
      title, description, project, assignees,
    } = req.body;

    const attachmentPromises = bodyAttachments.map((attachmentData) => new Attachment(attachmentData).save());
    const attachments = await Promise.all(attachmentPromises);

    const newBug = await Bug.create({
      customId: null,
      title,
      description,
      status: 'open',
      creator: userId,
      project,
      assignees,
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
