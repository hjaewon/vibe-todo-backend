const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
// ⬇️ 이 라우터를 제일 먼저 추가! (/:date 위에 있어야 함)
// 모든 한일 조회 및 검색 (검색용)
router.get('/', async (req, res) => {
  try {
    const { search, startDate, endDate } = req.query;
    
    // 검색 조건 생성
    let query = {};
    
    // 날짜 범위 필터 (선택사항)
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }
    
    // 검색어로 내용 검색 (모든 시간대 필드에서 LIKE 검색)
    if (search) {
      query.$or = [
        { hour_09_10: { $regex: search, $options: 'i' } },
        { hour_10_11: { $regex: search, $options: 'i' } },
        { hour_11_12: { $regex: search, $options: 'i' } },
        { hour_12_13: { $regex: search, $options: 'i' } },
        { hour_13_14: { $regex: search, $options: 'i' } },
        { hour_14_15: { $regex: search, $options: 'i' } },
        { hour_15_16: { $regex: search, $options: 'i' } },
        { hour_16_17: { $regex: search, $options: 'i' } },
        { hour_17_18: { $regex: search, $options: 'i' } },
        { hour_18_19: { $regex: search, $options: 'i' } },
        { hour_19_20: { $regex: search, $options: 'i' } },
        { hour_20_21: { $regex: search, $options: 'i' } },
        { hour_21_22: { $regex: search, $options: 'i' } },
        { hour_22_23: { $regex: search, $options: 'i' } }
      ];
    }
    
    const activities = await Activity.find(query).sort({ date: -1 });
    
    res.json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '한일 조회 실패',
      error: error.message
    });
  }
});
// 특정 날짜의 한일 조회
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;

    let activity = await Activity.findOne({ date });

    // 해당 날짜의 데이터가 없으면 빈 데이터 반환
    if (!activity) {
      return res.json({
        success: true,
        data: {
          date,
          hour_09_10: '',
          hour_10_11: '',
          hour_11_12: '',
          hour_12_13: '',
          hour_13_14: '',
          hour_14_15: '',
          hour_15_16: '',
          hour_16_17: '',
          hour_17_18: '',
          hour_18_19: '',
          hour_19_20: '',
          hour_20_21: '',
          hour_21_22: '',
          hour_22_23: ''
        }
      });
    }

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '한일 조회 실패',
      error: error.message
    });
  }
});

// 한일 저장/수정 (날짜 기준 전체 필드 수정)
router.post('/', async (req, res) => {
  try {
    const {
      date,
      hour_09_10,
      hour_10_11,
      hour_11_12,
      hour_12_13,
      hour_13_14,
      hour_14_15,
      hour_15_16,
      hour_16_17,
      hour_17_18,
      hour_18_19,
      hour_19_20,
      hour_20_21,
      hour_21_22,
      hour_22_23
    } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: '날짜를 입력해주세요'
      });
    }

    // 날짜로 찾아서 있으면 수정, 없으면 생성
    const activity = await Activity.findOneAndUpdate(
      { date },
      {
        date,
        hour_09_10: hour_09_10 || '',
        hour_10_11: hour_10_11 || '',
        hour_11_12: hour_11_12 || '',
        hour_12_13: hour_12_13 || '',
        hour_13_14: hour_13_14 || '',
        hour_14_15: hour_14_15 || '',
        hour_15_16: hour_15_16 || '',
        hour_16_17: hour_16_17 || '',
        hour_17_18: hour_17_18 || '',
        hour_18_19: hour_18_19 || '',
        hour_19_20: hour_19_20 || '',
        hour_20_21: hour_20_21 || '',
        hour_21_22: hour_21_22 || '',
        hour_22_23: hour_22_23 || ''
      },
      {
        new: true,
        upsert: true, // 없으면 생성
        runValidators: true
      }
    );

    res.json({
      success: true,
      message: '한일이 저장되었습니다',
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '한일 저장 실패',
      error: error.message
    });
  }
});

// 한일 수정 (PUT 방식)
router.put('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const {
      hour_09_10,
      hour_10_11,
      hour_11_12,
      hour_12_13,
      hour_13_14,
      hour_14_15,
      hour_15_16,
      hour_16_17,
      hour_17_18,
      hour_18_19,
      hour_19_20,
      hour_20_21,
      hour_21_22,
      hour_22_23
    } = req.body;

    const activity = await Activity.findOneAndUpdate(
      { date },
      {
        hour_09_10: hour_09_10 || '',
        hour_10_11: hour_10_11 || '',
        hour_11_12: hour_11_12 || '',
        hour_12_13: hour_12_13 || '',
        hour_13_14: hour_13_14 || '',
        hour_14_15: hour_14_15 || '',
        hour_15_16: hour_15_16 || '',
        hour_16_17: hour_16_17 || '',
        hour_17_18: hour_17_18 || '',
        hour_18_19: hour_18_19 || '',
        hour_19_20: hour_19_20 || '',
        hour_20_21: hour_20_21 || '',
        hour_21_22: hour_21_22 || '',
        hour_22_23: hour_22_23 || ''
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      message: '한일이 수정되었습니다',
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '한일 수정 실패',
      error: error.message
    });
  }
});

module.exports = router;

