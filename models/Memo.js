const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true // 사용자당 한 개의 메모만 존재
  },
  content: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Memo = mongoose.model('Memo', memoSchema);

module.exports = Memo;

