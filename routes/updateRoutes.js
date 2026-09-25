const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { getUpdates, addUpdate, getUpdateById, updateUpdate, deleteUpdate } = require('../controllers/updateController');

router.route('/').get(getUpdates).post(upload.array('images', 5), addUpdate);
router.route('/:id').get(getUpdateById).put(updateUpdate).delete(deleteUpdate);

module.exports = router;
