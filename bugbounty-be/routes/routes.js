const express = require('express');

const router = express.Router();
const authRoutes = require('./authRoutes');
const companyRoutes = require('./companyRoutes');

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);

module.exports = router;
