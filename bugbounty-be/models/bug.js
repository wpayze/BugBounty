const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Attachment = require('./attachment');

autoIncrement.initialize(mongoose.connection);

const bugSchema = new mongoose.Schema({
  customId: { type: Number },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['open', 'in progress', 'closed'],
    default: 'open',
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  attachments: [Attachment.schema],
});

bugSchema.plugin(autoIncrement.plugin, {
  model: 'Bug',
  field: 'customId',
  startAt: 1,
  incrementBy: 1,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
