const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 특정 날짜의 모든 할일 조회
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;

    const todos = await Todo.find({ date }).sort({ createdAt: 1 });

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 조회 실패',
      error: error.message
    });
  }
});

// 모든 할일 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1, createdAt: 1 });

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 조회 실패',
      error: error.message
    });
  }
});

// 새로운 할일 생성
router.post('/', async (req, res) => {
  try {
    const { date, task } = req.body;

    if (!date || !task) {
      return res.status(400).json({
        success: false,
        message: '날짜와 할일을 입력해주세요'
      });
    }

    const todo = new Todo({
      date,
      task,
      completed: false
    });

    await todo.save();

    res.status(201).json({
      success: true,
      message: '할일이 생성되었습니다',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 생성 실패',
      error: error.message
    });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { task, completed } = req.body;

    const updateData = {};
    if (task !== undefined) updateData.task = task;
    if (completed !== undefined) updateData.completed = completed;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      message: '할일이 수정되었습니다',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 수정 실패',
      error: error.message
    });
  }
});

// 할일 완료 상태 토글
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다'
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      success: true,
      message: '할일 상태가 변경되었습니다',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '상태 변경 실패',
      error: error.message
    });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      message: '할일이 삭제되었습니다',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 삭제 실패',
      error: error.message
    });
  }
});

// 특정 날짜의 완료된 할일 삭제
router.delete('/date/:date/completed', async (req, res) => {
  try {
    const { date } = req.params;

    const result = await Todo.deleteMany({ date, completed: true });

    res.json({
      success: true,
      message: `${result.deletedCount}개의 완료된 할일이 삭제되었습니다`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 삭제 실패',
      error: error.message
    });
  }
});

module.exports = router;

