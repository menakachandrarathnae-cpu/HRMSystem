const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON දත්ත කියවීමට

// MongoDB සම්බන්ධතාවය (Database Connection)
// [cite: 133, 145]
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB සම්බන්ධ විය!"))
    .catch(err => console.log("දෝෂයකි: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server එක ${PORT} port එකේ ක්‍රියාත්මක වේ.`);
});