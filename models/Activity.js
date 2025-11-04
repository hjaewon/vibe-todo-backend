const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD 형식
    required: true,
    unique: true // 날짜당 한 개의 문서만 존재
  },
  hour_09_10: {
    type: String,
    default: ''
  },
  hour_10_11: {
    type: String,
    default: ''
  },
  hour_11_12: {
    type: String,
    default: ''
  },
  hour_12_13: {
    type: String,
    default: ''
  },
  hour_13_14: {
    type: String,
    default: ''
  },
  hour_14_15: {
    type: String,
    default: ''
  },
  hour_15_16: {
    type: String,
    default: ''
  },
  hour_16_17: {
    type: String,
    default: ''
  },
  hour_17_18: {
    type: String,
    default: ''
  },
  hour_18_19: {
    type: String,
    default: ''
  },
  hour_19_20: {
    type: String,
    default: ''
  },
  hour_20_21: {
    type: String,
    default: ''
  },
  hour_21_22: {
    type: String,
    default: ''
  },
  hour_22_23: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

