const Performance = require('../models/Performance');

const getPerformances = async (req, res) => {
  try {
    const { employeeId, reviewerId } = req.query;
    let query = {};
    if (employeeId) query.employee = employeeId;
    if (reviewerId) query.reviewer = reviewerId;

    const performances = await Performance.find(query)
      .populate('employee', 'firstName lastName employeeId')
      .populate('reviewer', 'firstName lastName');
    res.json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPerformance = async (req, res) => {
  const performance = new Performance({ ...req.body, reviewer: req.user.id });
  try {
    const newPerformance = await performance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!performance) return res.status(404).json({ message: 'Performance review not found' });
    res.json(performance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPerformances, createPerformance, updatePerformance };