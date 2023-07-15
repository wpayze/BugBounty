const express = require('express');
const bugController = require('../controllers/bugController');
const commentController = require('../controllers/commentController');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// Bugs
router.get('/', authenticateJWT, bugController.getAllBugs);
router.get('/:bugId', authenticateJWT, bugController.getBugById);
router.get(
  '/project/:projectId',
  authenticateJWT,
  bugController.getBugsByProjectId,
);
router.post('/', authenticateJWT, bugController.createBug);
router.put('/:bugId', authenticateJWT, bugController.updateBugById);

// Comments
router.get('/:bugId/comments', authenticateJWT, commentController.getCommentByBugId);
router.post('/:bugId/comments', authenticateJWT, commentController.addComment);
router.put('/:bugId/comments/:commentId', authenticateJWT, commentController.updateComment);
router.delete('/:bugId/comments/:commentId', authenticateJWT, commentController.deleteComment);

// router.delete('/:projectId', authenticateJWT, projectController.deleteProjectById);

module.exports = router;
