const express = require('express');
const router = express.Router();
const { getUpdates, addUpdate, getUpdateById, updateUpdate, deleteUpdate } = require('../controllers/updateController');

router.route('/').get(getUpdates).post(addUpdate);
router.route('/:id').get(getUpdateById).put(updateUpdate).delete(deleteUpdate);

module.exports = router;
