const express = require('express');
const router = express.Router();
const { getResources, addResource, getResourceById, updateResource, deleteResource } = require('../controllers/resourceController');

router.route('/').get(getResources).post(addResource);
router.route('/:id').get(getResourceById).put(updateResource).delete(deleteResource);

module.exports = router;
