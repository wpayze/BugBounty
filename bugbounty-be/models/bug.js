const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema(
  {
    customId: { type: Number, unique: true },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['open', 'in progress', 'closed'],
      default: 'open',
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
  },
  {
    timestamps: true,
  }
);

bugSchema.pre('save', async function generateCustomId(next) {
  if (!this.customId) {
    const lastBug = await this.constructor.findOne(
      {},
      {},
      { sort: { customId: -1 } }
    );
    this.customId = lastBug ? lastBug.customId + 1 : 1;
  }
  next();
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
