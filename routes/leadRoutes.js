const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/', leadController.getLeads);
router.post('/', leadController.addLead); // Public route used by website
router.put('/:id', leadController.updateLeadStatus);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
