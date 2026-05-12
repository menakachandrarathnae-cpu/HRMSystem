const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLeaves, createLeave, updateLeaveStatus } = require('../controllers/leaveController');

router.get('/', authMiddleware, getLeaves);
router.post('/', authMiddleware, createLeave);
router.put('/:id/status', authMiddleware, updateLeaveStatus);

module.exports = router;