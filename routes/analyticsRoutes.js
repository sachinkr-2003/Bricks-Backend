const express = require('express');
const router = express.Router();
const { getDashboardStats, getBudgetStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getDashboardStats);
router.get('/budget', protect, getBudgetStats);

module.exports = router;

