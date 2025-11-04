const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
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

// 날짜와 할일로 복합 인덱스 생성
todoSchema.index({ date: 1, createdAt: 1 });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

