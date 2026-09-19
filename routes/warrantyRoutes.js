const express = require('express');
const router = express.Router();
const { getWarranties, addWarranty, getWarrantyById, updateWarranty, deleteWarranty } = require('../controllers/warrantyController');

router.route('/').get(getWarranties).post(addWarranty);
router.route('/:id').get(getWarrantyById).put(updateWarranty).delete(deleteWarranty);

module.exports = router;
