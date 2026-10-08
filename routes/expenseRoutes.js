const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, expenseController.getExpenses);
router.post('/', protect, expenseController.addExpense);
router.put('/:id', protect, expenseController.updateExpense);

module.exports = router;
