const Project = require("../models/project");
const Bug = require("../models/bug");

exports.getAllProjects = async (req, res) => {
  const { companyId } = req.user;

  try {
    const projects = await Project.find({ company: companyId });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting projects" });
  }
};

exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { companyId } = req.user;

  try {
    const project = await Project.findOne({
      _id: projectId,
      company: companyId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error getting project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the project" });
  }
};

exports.createProject = async (req, res) => {
  const { name, description, coverImage, attachments } = req.body;
  const { userId } = req.user;

  try {
    const newProject = await Project.create({
      name,
      description,
      creator: userId,
      coverImage,
      attachments,
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the project" });
  }
};

exports.updateProjectById = async (req, res) => {
  const { projectId } = req.params;
  const updateData = req.body;
  const { companyId } = req.user;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, company: companyId },
      updateData,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the project" });
  }
};

exports.deleteProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { companyId } = req.user;

  try {
    await Bug.deleteMany({ project: projectId });

    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      company: companyId,
    });
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the project" });
  }
};
