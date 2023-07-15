const express = require('express');
const bugController = require('../controllers/bugController');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, bugController.getAllBugs);
router.get('/:bugId', authenticateJWT, bugController.getBugById);
router.get('/project/:projectId', authenticateJWT, bugController.getBugsByProjectId);
router.post('/', authenticateJWT, bugController.createBug);
router.put('/:bugId', authenticateJWT, bugController.updateBugById);
// router.delete('/:projectId', authenticateJWT, projectController.deleteProjectById);

module.exports = router;
