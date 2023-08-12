const mongoose = require('mongoose');
const Attachment = require('./attachment');

const commentSchema = new mongoose.Schema(
  {
    content: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bug: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug' },
    attachments: [Attachment.schema],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
