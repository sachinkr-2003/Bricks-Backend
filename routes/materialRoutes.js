const express = require('express');
const router = express.Router();
const { getBills, addBill, getBillById, updateBill, deleteBill } = require('../controllers/materialController');

router.route('/').get(getBills).post(addBill);
router.route('/:id').get(getBillById).put(updateBill).delete(deleteBill);

module.exports = router;
