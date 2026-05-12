const Payroll = require('../models/Payroll');

const getPayrolls = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;
    let query = {};
    if (employeeId) query.employee = employeeId;
    if (month) query.month = month;
    if (year) query.year = year;

    const payrolls = await Payroll.find(query).populate('employee', 'firstName lastName employeeId');
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPayroll = async (req, res) => {
  const payroll = new Payroll(req.body);
  try {
    const newPayroll = await payroll.save();
    res.status(201).json(newPayroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });
    res.json(payroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generatePayslip = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate('employee');
    if (!payroll) return res.status(404).json({ message: 'Payroll not found' });

    // Simple payslip generation (in real app, use PDF library)
    const payslip = {
      employee: payroll.employee,
      period: `${payroll.month} ${payroll.year}`,
      earnings: {
        basic: payroll.basicSalary,
        overtime: payroll.overtimeHours * payroll.overtimeRate,
        bonuses: payroll.bonuses
      },
      deductions: {
        tax: payroll.tax,
        insurance: payroll.insurance,
        other: payroll.deductions
      },
      netSalary: payroll.netSalary
    };

    res.json(payslip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPayrolls, createPayroll, updatePayroll, generatePayslip };