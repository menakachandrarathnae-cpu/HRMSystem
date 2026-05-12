const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAttendance, checkIn, checkOut, updateAttendance } = require('../controllers/attendanceController');

router.get('/', authMiddleware, getAttendance);
router.post('/checkin', authMiddleware, checkIn);
router.post('/checkout', authMiddleware, checkOut);
router.put('/:id', authMiddleware, updateAttendance);

module.exports = router;