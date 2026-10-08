const express = require('express');
const router = express.Router();
const warrantyController = require('../controllers/warrantyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, warrantyController.createComplaint);
router.get('/', protect, warrantyController.getComplaints);

module.exports = router;
