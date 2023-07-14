const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  description: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profileImage: String,
  location: String,
  founded: Date,
  industry: String,
});

module.exports = mongoose.model('Company', companySchema);