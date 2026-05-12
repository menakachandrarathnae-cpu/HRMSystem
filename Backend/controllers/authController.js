const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ message: 'Invalid credentials' });

    // For simplicity, assume password is stored as plain text or hash it
    // In production, hash passwords
    const isMatch = await bcrypt.compare(password, employee.password || 'password'); // placeholder
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = {
      id: employee._id,
      role: employee.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { employeeId, firstName, lastName, email, password, role } = req.body;

  try {
    let employee = await Employee.findOne({ email });
    if (employee) return res.status(400).json({ message: 'Employee already exists' });

    employee = new Employee({
      employeeId,
      firstName,
      lastName,
      email,
      role: role || 'Employee'
    });

    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(password, salt);

    await employee.save();

    const payload = {
      id: employee._id,
      role: employee.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };