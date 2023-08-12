const Comment = require('../models/comment');
const ChangeEvent = require('../models/changeEvent');
const Bug = require('../models/bug');
const User = require('../models/user');

async function validateBugOwnership(bugId, companyId) {
  const bug = await Bug.findById(bugId).populate('creator');
  if (!bug) {
    throw new Error('Bug not found');
  }

  if (bug.creator.company.toString() !== companyId) {
    throw new Error('Forbidden: Bug does not belong to your company');
  }

  return bug;
}

exports.getCommentAndEventsByBugId = async (req, res) => {
  const { bugId } = req.params;
  const { companyId } = req.user;

  try {
    await validateBugOwnership(bugId, companyId);
    const comments = await Comment.find({ bug: bugId }).populate(
      'creator',
      'name email'
    ).sort({ _id: -1 });
    const events = await ChangeEvent.find({ bug: bugId })
      .populate('user')
      .sort({ _id: -1 });

    const result = {
      comments,
      events,
    };
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting comments:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting the comments' });
  }
};

exports.getCommentByBugId = async (req, res) => {
  const { bugId } = req.params;
  const { companyId } = req.user;

  try {
    await validateBugOwnership(bugId, companyId);
    const comments = await Comment.find({ bug: bugId }).populate(
      'creator',
      'name email'
    ).sort({ _id: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while getting the comments' });
  }
};

exports.addComment = async (req, res) => {
  const { bugId } = req.params;
  const { userId, companyId } = req.user;
  const { content } = req.body;

  try {
    await validateBugOwnership(bugId, companyId);
    const newComment = await Comment.create({
      content,
      creator: userId,
      bug: bugId,
      timestamp: new Date(),
    });

    const user = await User.findById(userId);
    ChangeEvent.create({
      type: 'comment',
      user: userId,
      bug: bugId,
      timestamp: new Date(),
      details: `${user.name} (${user.email}) commented`,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while adding the comment' });
  }
};

exports.updateComment = async (req, res) => {
  const { bugId, commentId } = req.params;
  const { companyId } = req.user;
  const { content } = req.body;

  try {
    await validateBugOwnership(bugId, companyId);

    const comment = await Comment.findOne({ _id: commentId, bug: bugId });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the comment' });
  }
};

exports.deleteComment = async (req, res) => {
  const { bugId, commentId } = req.params;
  const { companyId } = req.user;

  try {
    const bug = await validateBugOwnership(bugId, companyId);

    const comment = await Comment.findOne({ _id: commentId, bug: bugId });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.deleteOne({ _id: commentId });
    res.status(204).json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the comment' });
  }
};
