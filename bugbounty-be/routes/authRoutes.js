const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Routes for authentication
router.post('/register', authController.registerUserAndCreateCompany);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/verify', authenticateJWT, authController.verifyToken);

module.exports = router;
