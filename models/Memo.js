const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  content: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Memo = mongoose.model('Memo', memoSchema);

module.exports = Memo;

