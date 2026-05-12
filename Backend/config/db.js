const mongoose = require('mongoose');

// --- DATABASE CONNECTION CONFIGURATION ---
// 1. Password 'Menaka@$Ruwani1' is URL encoded: '@' becomes '%40' and '$' becomes '%24'.
// 2. 'tls=true' ensures a secure connection, which is often required by ISPs like Dialog.
const MONGODB_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("-----------------------------------------");
        console.log("✅ MongoDB Atlas Connected Successfully!");
        console.log("-----------------------------------------");
    } catch (err) {
        console.error("-----------------------------------------");
        console.error("❌ MongoDB Connection Failed!");
        console.error("Error Message:", err.message); // Displays specific errors like ECONNREFUSED.
        console.error("-----------------------------------------");
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;