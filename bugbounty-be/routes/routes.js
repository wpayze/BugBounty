const express = require('express');

const router = express.Router();
const authRoutes = require('./authRoutes');
const companyRoutes = require('./companyRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
