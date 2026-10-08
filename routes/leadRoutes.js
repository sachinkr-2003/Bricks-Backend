const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect, adminOrManager } = require('../middleware/authMiddleware');

router.get('/', protect, leadController.getLeads);
router.post('/', leadController.addLead); // Public route used by website
router.put('/:id', protect, adminOrManager, leadController.updateLeadStatus);
router.delete('/:id', protect, adminOrManager, leadController.deleteLead);

module.exports = router;
