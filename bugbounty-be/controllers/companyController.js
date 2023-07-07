const Company = require("../models/company");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error getting companies:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting companies" });
  }
};

exports.getCompanyById = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error("Error getting company:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the company" });
  }
};

exports.createCompany = async (req, res) => {
  const {
    name,
    description,
    users,
    profileImage,
    location,
    founded,
    industry,
  } = req.body;
  try {
    const newCompany = await Company.create({
      name,
      description,
      users,
      profileImage,
      location,
      founded,
      industry,
    });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the company" });
  }
};

exports.updateCompanyById = async (req, res) => {
  const { companyId } = req.params;
  const updateData = req.body;

  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only administrators can update a company" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (!company.users.includes(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this company" });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the company" });
  }
};

exports.deleteCompanyById = async (req, res) => {
  const { companyId } = req.params;
  try {
    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the company" });
  }
};
