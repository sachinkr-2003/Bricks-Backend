const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { getBills, addBill, getBillById, updateBill, deleteBill } = require('../controllers/materialController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBills).post(protect, upload.single('billImage'), addBill);
router.route('/:id').get(protect, getBillById).put(protect, updateBill).delete(protect, deleteBill);

module.exports = router;
