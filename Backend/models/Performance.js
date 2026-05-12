const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  period: {
    type: String,
    required: true // e.g., 'Q1 2024', 'Annual 2024'
  },
  goals: [{
    description: String,
    weight: Number,
    achieved: {
      type: Boolean,
      default: false
    }
  }],
  kpis: [{
    name: String,
    target: Number,
    achieved: Number,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  overallRating: {
    type: Number,
    min: 1,
    max: 5
  },
  comments: {
    type: String
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Reviewed'],
    default: 'Draft'
  },
  reviewDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Performance', performanceSchema);