const express = require('express');
const router = express.Router();
const Memo = require('../models/Memo');

// 메모 조회
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    // userId 필수 체크
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId를 입력해주세요'
      });
    }

    // 사용자별 메모는 한 건만 존재
    let memo = await Memo.findOne({ userId });

    // 메모가 없으면 빈 메모 생성
    if (!memo) {
      memo = new Memo({ userId, content: '' });
      await memo.save();
    }

    res.json({
      success: true,
      data: memo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '메모 조회 실패',
      error: error.message
    });
  }
});

// 메모 저장/수정
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;

    // userId 필수 체크
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId를 입력해주세요'
      });
    }

    // 기존 메모 찾기
    let memo = await Memo.findOne({ userId });

    if (memo) {
      // 기존 메모가 있으면 업데이트
      memo.content = content || '';
      await memo.save();
    } else {
      // 기존 메모가 없으면 새로 생성
      memo = new Memo({ userId, content: content || '' });
      await memo.save();
    }

    res.json({
      success: true,
      message: '메모가 저장되었습니다',
      data: memo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '메모 저장 실패',
      error: error.message
    });
  }
});

// 메모 수정 (PUT 방식)
router.put('/', async (req, res) => {
  try {
    const { userId, content } = req.body;

    // userId 필수 체크
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId를 입력해주세요'
      });
    }

    let memo = await Memo.findOne({ userId });

    if (!memo) {
      // 메모가 없으면 새로 생성
      memo = new Memo({ userId, content: content || '' });
      await memo.save();
    } else {
      // 메모가 있으면 업데이트
      memo.content = content || '';
      await memo.save();
    }

    res.json({
      success: true,
      message: '메모가 수정되었습니다',
      data: memo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '메모 수정 실패',
      error: error.message
    });
  }
});

module.exports = router;

