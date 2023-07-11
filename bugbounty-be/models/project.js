const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coverImage: String,
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
