const express = require('express');
const router = express.Router();
const { getProjects, addProject, getProjectById, updateProject, deleteProject, updateConfig } = require('../controllers/projectController');

router.route('/config').put(updateConfig);
router.route('/').get(getProjects).post(addProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);

module.exports = router;
