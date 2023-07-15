const express = require('express');

const router = express.Router();
const authRoutes = require('./authRoutes');
const companyRoutes = require('./companyRoutes');
const projectRoutes = require('./projectRoutes');
const bugRoutes = require('./bugRoutes');

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/projects', projectRoutes);
router.use('/bugs', bugRoutes);

module.exports = router;
