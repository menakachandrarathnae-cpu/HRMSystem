const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json()); 


const employeeRoutes = require('./Backend/routes/employees');
const authRoutes = require('./Backend/routes/auth');
const attendanceRoutes = require('./Backend/routes/attendance');
const leaveRoutes = require('./Backend/routes/leaves');
const payrollRoutes = require('./Backend/routes/payroll');
const jobRoutes = require('./Backend/routes/jobs');
const performanceRoutes = require('./Backend/routes/performance');

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/performance', performanceRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connection"))
    .catch(err => console.log("Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server එක ${PORT} port active.`);
});