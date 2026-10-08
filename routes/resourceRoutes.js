const express = require('express');
const router = express.Router();
const { getResources, addResource, getResourceById, updateResource, deleteResource } = require('../controllers/resourceController');
const { protect, adminOrManager } = require('../middleware/authMiddleware');

router.route('/').get(protect, getResources).post(protect, adminOrManager, addResource);
router.route('/:id').get(protect, getResourceById).put(protect, adminOrManager, updateResource).delete(protect, adminOrManager, deleteResource);

module.exports = router;
