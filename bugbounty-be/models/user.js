const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  role: {
    type: String,
    enum: ['admin', 'dev', 'project manager', 'tester'],
    default: 'dev',
  },
  profileImage: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
