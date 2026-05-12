const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await Employee.findOne({ email: 'admin@hrm.com' });
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new Employee({
      employeeId: 'ADM001',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@hrm.com',
      password: hashedPassword,
      phone: '1234567890',
      department: 'HR',
      position: 'Administrator',
      joiningDate: new Date(),
      salary: 100000,
      role: 'Admin'
    });

    await admin.save();
    console.log('Admin user created');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();