const Comment = require('../models/comment');
const Bug = require('../models/bug');

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

exports.getCommentByBugId = async (req, res) => {
  const { bugId } = req.params;
  const { companyId } = req.user;

  try {
    await validateBugOwnership(bugId, companyId);
    const comments = await Comment.find({ bug: bugId }).populate('creator', 'name email');
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ message: 'An error occurred while getting the comments' });
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
