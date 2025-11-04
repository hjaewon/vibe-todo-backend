# Todo Backend API

할일 및 한일을 관리하는 백엔드 API 서버입니다.

## 기술 스택

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS (Cross-Origin Resource Sharing)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드 실행
npm run dev

# 프로덕션 모드 실행
npm start
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-backend
```

## CORS 설정

이 API는 CORS가 활성화되어 있어 모든 도메인에서 접근이 가능합니다.

**프로덕션 환경에서는** `index.js` 파일의 CORS 설정을 수정하여 특정 도메인만 허용하는 것을 권장합니다.

---

## 데이터베이스 스키마

### 1. User (사용자 정보)

| 필드 | 타입 | 설명 | 필수 |
|------|------|------|------|
| userId | String | 사용자 ID | O |
| password | String | 비밀번호 | O |
| email | String | 이메일 | O |
| nickname | String | 닉네임 | O |

### 2. Todo (할일 정보)

| 필드 | 타입 | 설명 | 기본값 |
|------|------|------|--------|
| date | String | 날짜 (YYYY-MM-DD) | - |
| task | String | 할일 내용 | - |
| completed | Boolean | 완료 여부 | false |

### 3. Activity (한일 정보)

| 필드 | 타입 | 설명 | 기본값 |
|------|------|------|--------|
| date | String | 날짜 (YYYY-MM-DD, unique) | - |
| hour_09_10 | String | 09~10시 한일 | "" |
| hour_10_11 | String | 10~11시 한일 | "" |
| hour_11_12 | String | 11~12시 한일 | "" |
| hour_12_13 | String | 12~13시 한일 | "" |
| hour_13_14 | String | 13~14시 한일 | "" |
| hour_14_15 | String | 14~15시 한일 | "" |
| hour_15_16 | String | 15~16시 한일 | "" |
| hour_16_17 | String | 16~17시 한일 | "" |
| hour_17_18 | String | 17~18시 한일 | "" |
| hour_18_19 | String | 18~19시 한일 | "" |
| hour_19_20 | String | 19~20시 한일 | "" |
| hour_20_21 | String | 20~21시 한일 | "" |
| hour_21_22 | String | 21~22시 한일 | "" |
| hour_22_23 | String | 22~23시 한일 | "" |

### 4. Memo (메모장)

| 필드 | 타입 | 설명 | 기본값 |
|------|------|------|--------|
| content | String | 메모 내용 (longtext) | "" |

※ 메모는 한 건만 저장됩니다.

---

## API 엔드포인트

### 사용자 관리 (`/api/users`)

#### 1. 회원가입
```
POST /api/users/register
```

**요청 본문:**
```json
{
  "userId": "user123",
  "password": "password123",
  "email": "user@example.com",
  "nickname": "홍길동"
}
```

#### 2. 로그인
```
POST /api/users/login
```

**요청 본문:**
```json
{
  "userId": "user123",
  "password": "password123"
}
```

#### 3. 사용자 ID 중복 확인
```
GET /api/users/check-userid/:userId
```

**예시:** `GET /api/users/check-userid/user123`

#### 4. 본인 확인 (사용자 ID + 이메일)
```
POST /api/users/verify
```

**요청 본문:**
```json
{
  "userId": "user123",
  "email": "user@example.com"
}
```

#### 5. 비밀번호 변경
```
PUT /api/users/change-password
```

**요청 본문:**
```json
{
  "userId": "user123",
  "email": "user@example.com",
  "newPassword": "newpassword123"
}
```

#### 6. 사용자 정보 조회
```
GET /api/users/:userId
```

---

### 할일 관리 (`/api/todos`)

#### 1. 특정 날짜의 할일 조회
```
GET /api/todos/date/:date
```

**예시:** `GET /api/todos/date/2025-11-02`

#### 2. 모든 할일 조회
```
GET /api/todos
```

#### 3. 할일 생성
```
POST /api/todos
```

**요청 본문:**
```json
{
  "date": "2025-11-02",
  "task": "프로젝트 완성하기"
}
```

#### 4. 할일 수정
```
PUT /api/todos/:id
```

**요청 본문:**
```json
{
  "task": "수정된 할일",
  "completed": true
}
```

#### 5. 할일 완료 상태 토글
```
PATCH /api/todos/:id/toggle
```

#### 6. 할일 삭제
```
DELETE /api/todos/:id
```

#### 7. 특정 날짜의 완료된 할일 삭제
```
DELETE /api/todos/date/:date/completed
```

---

### 한일 관리 (`/api/activities`)

#### 1. 특정 날짜의 한일 조회
```
GET /api/activities/:date
```

**예시:** `GET /api/activities/2025-11-02`

#### 2. 한일 저장/수정
```
POST /api/activities
```

**요청 본문:**
```json
{
  "date": "2025-11-02",
  "hour_09_10": "회의 참석",
  "hour_10_11": "코딩",
  "hour_11_12": "점심 식사",
  "hour_12_13": "프로젝트 진행",
  "hour_13_14": "문서 작성",
  "hour_14_15": "팀 미팅",
  "hour_15_16": "버그 수정",
  "hour_16_17": "코드 리뷰",
  "hour_17_18": "테스트",
  "hour_18_19": "저녁 식사",
  "hour_19_20": "개인 공부",
  "hour_20_21": "독서",
  "hour_21_22": "운동",
  "hour_22_23": "휴식"
}
```

#### 3. 한일 수정 (PUT)
```
PUT /api/activities/:date
```

**요청 본문:** 위와 동일

---

### 메모장 관리 (`/api/memo`)

#### 1. 메모 조회
```
GET /api/memo
```

#### 2. 메모 저장/수정 (POST)
```
POST /api/memo
```

**요청 본문:**
```json
{
  "content": "여기에 메모 내용을 작성합니다..."
}
```

#### 3. 메모 수정 (PUT)
```
PUT /api/memo
```

**요청 본문:** 위와 동일

---

## 응답 형식

### 성공 응답
```json
{
  "success": true,
  "message": "성공 메시지",
  "data": { ... }
}
```

### 에러 응답
```json
{
  "success": false,
  "message": "에러 메시지",
  "error": "상세 에러 내용"
}
```

---

## 사용 예시

```bash
# 회원가입
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testuser",
    "password": "test1234",
    "email": "test@example.com",
    "nickname": "테스트유저"
  }'

# 할일 생성
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-02",
    "task": "MongoDB 공부하기"
  }'

# 한일 저장
curl -X POST http://localhost:5000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-02",
    "hour_09_10": "회의",
    "hour_10_11": "개발"
  }'

# 메모 저장
curl -X POST http://localhost:5000/api/memo \
  -H "Content-Type: application/json" \
  -d '{
    "content": "오늘의 메모입니다."
  }'
```

## 라이선스

ISC
