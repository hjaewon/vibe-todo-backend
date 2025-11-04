const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// 라우트 import
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const activityRoutes = require('./routes/activityRoutes');
const memoRoutes = require('./routes/memoRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS 설정
app.use(cors({
  origin: '*', // 모든 도메인 허용 (프로덕션에서는 특정 도메인으로 제한 권장)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// MongoDB 연결
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-backend';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

// 라우트 설정
// 루트 경로
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Vibe Todo Backend API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      todos: '/api/todos',
      activities: '/api/activities',
      memo: '/api/memo'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/memo', memoRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


