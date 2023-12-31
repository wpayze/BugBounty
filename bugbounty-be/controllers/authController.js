const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const Company = require('../models/company');

const generateUserPayload = (user) => ({
  userId: user._id,
  email: user.email,
  role: user.role,
  companyId: user.company,
});

const generateAccessToken = (user) => {
  const payload = generateUserPayload(user);
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return accessToken;
};

const generateRefreshToken = (user) => {
  const payload = generateUserPayload(user);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  return refreshToken;
};

exports.registerUserAndCreateCompany = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const newCompany = await Company.create({
      name: companyName,
      description: '',
      users: [],
      profileImage: '',
      location: '',
      founded: new Date(),
      industry: '',
    });

    const newUser = new User({
      name,
      email,
      password,
      company: newCompany._id,
      role: 'admin',
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    await newUser.save();

    newCompany.users.push(newUser._id);
    await newCompany.save();

    res
      .status(201)
      .json({ message: 'User registered and company created successfully' });
  } catch (error) {
    console.error('Error registering user and creating company:', error);
    res.status(500).json({
      message:
        'An error occurred while registering the user and creating the company',
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { companyId } = req.user;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    const isValidCompanyId = mongoose.Types.ObjectId.isValid(companyId);
    if (!isValidCompanyId) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const existingCompany = await Company.findById(companyId);
    if (!existingCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    newUser.company = existingCompany._id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    await newUser.save();

    existingCompany.users.push(newUser._id);
    await existingCompany.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while registering the user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.cookie('accessToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'An error occurred while logging out' });
  }
};

exports.verifyToken = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
