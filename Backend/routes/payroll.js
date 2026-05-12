const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getPayrolls, createPayroll, updatePayroll, generatePayslip } = require('../controllers/payrollController');

router.get('/', authMiddleware, getPayrolls);
router.post('/', authMiddleware, createPayroll);
router.put('/:id', authMiddleware, updatePayroll);
router.get('/:id/payslip', authMiddleware, generatePayslip);

module.exports = router;