const User = require('../models/user');
const mongoose = require('mongoose');
const uploadFiles = require('../helpers/fileUploader');

const fs = require('fs');
const path = require('path');

exports.getAllUsers = async (req, res) => {
  const { companyId } = req.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const users = await User.find({ company: companyId }).select('-password');

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  const { companyId } = req.user;
  const { userId } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(companyId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: 'Invalid company ID or user ID' });
    }

    const user = await User.findOne(
      { _id: userId, company: companyId },
      '-password'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserById = async (req, res) => {
  const { companyId } = req.user;
  const { userId } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(companyId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: 'Invalid company ID or user ID' });
    }

    const user = await User.findOne({ _id: userId, company: companyId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const files = await uploadFiles(req, res);
    const profileImage = files.find((f) => f.fieldname === 'profileImage');

    if (profileImage && user.profileImage) {
      fs.unlink(
        path.join(__dirname, '../uploads', user.profileImage),
        (err) => {
          if (err) console.error('Error deleting file:', err);
        }
      );
    }

    const { name, role } = req.body;

    const updateFields = {
      name,
      role,
    };

    if (profileImage) {
      updateFields.profileImage = profileImage.url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
