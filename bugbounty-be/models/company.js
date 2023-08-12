const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Your Company',
    },
    description: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    profileImage: String,
    location: String,
    founded: Date,
    industry: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', companySchema);
