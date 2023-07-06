const mongoose = require('mongoose');

const changeEventSchema = new mongoose.Schema({
  type: { type: String, enum: ['creation', 'modification', 'comment', 'assignment'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bug: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug' },
  timestamp: Date,
  details: String,
});

const ChangeEvent = mongoose.model('ChangeEvent', changeEventSchema);

module.exports = ChangeEvent;
