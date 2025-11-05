const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: String, // YYYY-MM-DD 형식
    required: true
  },
  task: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// userId, 날짜, 생성일로 복합 인덱스 생성
todoSchema.index({ userId: 1, date: 1, createdAt: 1 });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

