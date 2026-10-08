const express = require('express');
const router = express.Router();
const { getAttendances, markAttendance, getAttendanceById, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAttendances).post(protect, markAttendance);
router.route('/:id').get(protect, getAttendanceById).put(protect, updateAttendance).delete(protect, deleteAttendance);

module.exports = router;
