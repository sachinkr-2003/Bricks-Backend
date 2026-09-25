const express = require('express');
const router = express.Router();
const warrantyController = require('../controllers/warrantyController');

router.post('/', warrantyController.createComplaint);
router.get('/', warrantyController.getComplaints);

module.exports = router;
