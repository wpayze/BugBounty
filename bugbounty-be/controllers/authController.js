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
    const {
      name, email, password, companyName,
    } = req.body;

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
    const {
      name, email, password, company, role,
    } = req.body;

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

    const isValidCompanyId = mongoose.Types.ObjectId.isValid(company);
    if (!isValidCompanyId) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const existingCompany = await Company.findById(company);
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

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided', isValid: false });
    }

    const token = authHeader.split(' ')[1];

    console.log(token);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', isValid: false });
    }

    res.status(200).json({ message: 'Token verified successfully', user, isValid: true });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'An error occurred while verifying the token', isValid: false });
  }
};
