const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { getUpdates, addUpdate, getUpdateById, updateUpdate, deleteUpdate } = require('../controllers/updateController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUpdates).post(protect, upload.array('images', 5), addUpdate);
router.route('/:id').get(protect, getUpdateById).put(protect, updateUpdate).delete(protect, deleteUpdate);

module.exports = router;
