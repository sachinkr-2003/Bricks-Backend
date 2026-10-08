const express = require('express');
const router = express.Router();
const { getProjects, addProject, getProjectById, updateProject, deleteProject, updateConfig } = require('../controllers/projectController');
const { protect, adminOrManager } = require('../middleware/authMiddleware');

router.route('/config').put(protect, adminOrManager, updateConfig);
router.route('/').get(protect, getProjects).post(protect, adminOrManager, addProject);
router.route('/:id').get(protect, getProjectById).put(protect, adminOrManager, updateProject).delete(protect, adminOrManager, deleteProject);

module.exports = router;
