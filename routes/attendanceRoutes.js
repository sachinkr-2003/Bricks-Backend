const express = require('express');
const router = express.Router();
const { getAttendances, markAttendance, getAttendanceById, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');

router.route('/').get(getAttendances).post(markAttendance);
router.route('/:id').get(getAttendanceById).put(updateAttendance).delete(deleteAttendance);

module.exports = router;
