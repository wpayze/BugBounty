const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, userController.getAllUsers);
router.get('/:userId', authenticateJWT, userController.getUserById);
router.put('/:userId', authenticateJWT, userController.updateUserById);

module.exports = router;
