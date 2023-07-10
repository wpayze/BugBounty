const express = require('express');
const projectController = require('../controllers/projectController');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, projectController.getAllProjects);
router.get('/:projectId', authenticateJWT, projectController.getProjectById);
router.post('/', authenticateJWT, projectController.createProject);
router.put('/:projectId', authenticateJWT, projectController.updateProjectById);
router.delete('/:projectId', authenticateJWT, projectController.deleteProjectById);

module.exports = router;
