const Leave = require('../models/Leave');
const AuditLog = require('../models/AuditLog');

const getLeaves = async (req, res) => {
  try {
    const { employeeId, status } = req.query;
    let query = {};
    if (employeeId) query.employee = employeeId;
    if (status) query.status = status;

    const leaves = await Leave.find(query)
      .populate('employee', 'firstName lastName employeeId')
      .populate('approvedBy', 'firstName lastName');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLeave = async (req, res) => {
  const leave = new Leave(req.body);
  try {
    const newLeave = await leave.save();
    res.status(201).json(newLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status, comments } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedBy: req.user.id,
        approvedAt: new Date(),
        comments
      },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    await AuditLog.create({
      user: req.user.id,
      action: 'Update Leave Status',
      details: `Leave ID ${req.params.id} status changed to ${status}`
    });

    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getLeaves, createLeave, updateLeaveStatus };