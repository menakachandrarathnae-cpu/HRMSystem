const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract'],
    default: 'Full-time'
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Filled'],
    default: 'Open'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  applicants: [{
    applicant: {
      name: String,
      email: String,
      phone: String,
      resume: String
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Interviewed', 'Rejected', 'Hired'],
      default: 'Applied'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);