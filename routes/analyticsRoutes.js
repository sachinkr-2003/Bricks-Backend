const express = require('express');
const router = express.Router();
const { getDashboardStats, getBudgetStats } = require('../controllers/analyticsController');

router.get('/dashboard', getDashboardStats);
router.get('/budget', getBudgetStats);

module.exports = router;
