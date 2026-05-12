const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getPerformances, createPerformance, updatePerformance } = require('../controllers/performanceController');

router.get('/', authMiddleware, getPerformances);
router.post('/', authMiddleware, createPerformance);
router.put('/:id', authMiddleware, updatePerformance);

module.exports = router;