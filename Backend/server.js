const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Initialize App and Environment Variables
dotenv.config();
const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json()); // Essential to parse JSON data from frontend

// 3. Database Connection
// Password 'Menaka@$Ruwani1' is URL encoded to handle special characters
// '&tls=true' added for stable connection on Dialog 4G
const MONGODB_URI = "mongodb+srv://ruwani:Menaka%40%24Ruwani1@cluster0.wonjfak.mongodb.net/hrm_system?retryWrites=true&w=majority&tls=true";

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("-----------------------------------------");
        console.log("✅ MongoDB Atlas Connected Successfully!");
        console.log("-----------------------------------------");
    })
    .catch((err) => {
        console.log("-----------------------------------------");
        console.log("❌ Database Connection Failed!");
        console.log("Error: ", err.message);
        console.log("-----------------------------------------");
    });

// 4. Import Routes
// These match the files shown in your project explorer
const attendanceRoutes = require('./routes/attendance');
const employeeRoutes = require('./routes/employees');
const jobRoutes = require('./routes/jobs');
const leaveRoutes = require('./routes/leaves');
const payrollRoutes = require('./routes/payroll');
const performanceRoutes = require('./routes/performance');
const authRoutes = require('./routes/auth');

// 5. Use Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/auth', authRoutes);

// 6. Basic Server Check
app.get('/', (req, res) => {
    res.send("HRM Backend Server is running...");
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});