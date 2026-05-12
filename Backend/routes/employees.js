const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/authMiddleware');

// Get all employees - requires auth
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find().populate('manager', 'firstName lastName');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get employee by ID - requires auth
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('manager', 'firstName lastName');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new employee - requires auth (admin/HR)
router.post('/', authMiddleware, async (req, res) => {
  // Check if user has permission
  if (!['Admin', 'HR Staff'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const employee = new Employee(req.body);
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee - requires auth
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee - requires auth (admin/HR)
router.delete('/:id', authMiddleware, async (req, res) => {
  if (!['Admin', 'HR Staff'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;