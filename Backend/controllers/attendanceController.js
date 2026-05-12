const Attendance = require('../models/Attendance');

const getAttendance = async (req, res) => {
  try {
    const { employeeId, date } = req.query;
    let query = {};
    if (employeeId) query.employee = employeeId;
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query).populate('employee', 'firstName lastName employeeId');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({ employee: employeeId, date: today });

    if (!attendance) {
      attendance = new Attendance({
        employee: employeeId,
        date: today,
        checkIn: new Date(),
        status: 'Present'
      });
    } else {
      attendance.checkIn = new Date();
      attendance.status = 'Present';
    }

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({ employee: employeeId, date: today });

    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ message: 'No check-in record found' });
    }

    attendance.checkOut = new Date();
    const workingHours = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
    attendance.workingHours = workingHours;

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAttendance, checkIn, checkOut, updateAttendance };