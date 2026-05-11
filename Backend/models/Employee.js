const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  joiningDate: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'HR Staff', 'Employee', 'Manager'],
    default: 'Employee'
  },
  employmentHistory: [{
    position: String,
    department: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  documents: [{
    type: {
      type: String,
      enum: ['CV', 'Certificate', 'Other']
    },
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);