const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { userId, password, email, nickname } = req.body;

    // 필수 필드 확인
    if (!userId || !password || !email || !nickname) {
      return res.status(400).json({
        success: false,
        message: '모든 필드를 입력해주세요'
      });
    }

    // 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '이미 존재하는 사용자 ID입니다'
      });
    }

    const user = new User({
      userId,
      password, // 실제 프로덕션에서는 bcrypt로 해싱 필요
      email,
      nickname
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다',
      data: {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '회원가입 실패',
      error: error.message
    });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: '사용자 ID와 비밀번호를 입력해주세요'
      });
    }

    const user = await User.findOne({ userId });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: '사용자 ID 또는 비밀번호가 일치하지 않습니다'
      });
    }

    res.json({
      success: true,
      message: '로그인 성공',
      data: {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '로그인 실패',
      error: error.message
    });
  }
});

// 사용자 ID 중복 확인
router.get('/check-userid/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      return res.json({
        success: false,
        available: false,
        message: '이미 존재하는 사용자 ID입니다'
      });
    }

    res.json({
      success: true,
      available: true,
      message: '사용 가능한 사용자 ID입니다'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'ID 중복 확인 실패',
      error: error.message
    });
  }
});

// 본인 확인 (사용자 ID + 이메일)
router.post('/verify', async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({
        success: false,
        message: '사용자 ID와 이메일을 입력해주세요'
      });
    }

    const user = await User.findOne({ userId, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: '일치하는 사용자 정보가 없습니다'
      });
    }

    res.json({
      success: true,
      verified: true,
      message: '본인 확인이 완료되었습니다',
      data: {
        userId: user.userId,
        nickname: user.nickname
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '본인 확인 실패',
      error: error.message
    });
  }
});

// 비밀번호 변경 (본인 확인 후)
router.put('/change-password', async (req, res) => {
  try {
    const { userId, email, newPassword } = req.body;

    if (!userId || !email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: '모든 필드를 입력해주세요'
      });
    }

    // 본인 확인
    const user = await User.findOne({ userId, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '일치하는 사용자 정보가 없습니다'
      });
    }

    // 비밀번호 변경
    user.password = newPassword; // 실제 프로덕션에서는 bcrypt로 해싱 필요
    await user.save();

    res.json({
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '비밀번호 변경 실패',
      error: error.message
    });
  }
});

// 사용자 정보 조회
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      });
    }

    res.json({
      success: true,
      data: {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '사용자 조회 실패',
      error: error.message
    });
  }
});

module.exports = router;

