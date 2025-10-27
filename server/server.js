const express = require('express');
const cors = require('cors');
const conn = require('./mariadb')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// JWT 비밀키 설정
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

//투두 조회
app.get('/api/todos', (req, res) => {

  let sql = 'SELECT * FROM todolist ORDER BY  updated_at DESC, id DESC;'

  conn.query(sql, (err, results) => {
    if (err) {
      console.error('❌ DB 오류:', err);
      return res.status(500).json({ error: '서버 오류 발생' });
    }
    res.status(201).json(results);

  })
});

app.post('/api/todos', (req, res) => {
  const { task, completed, category, notes, user_id } = req.body;

  // user_id가 없으면 요청 거부
  if (!user_id) {
    return res.status(400).json({ error: 'user_id는 필수입니다.' });
  }

  const sql = `
    INSERT INTO todolist (user_id, task, completed, category, notes)
    VALUES (?, ?, ?, ?, ?);
  `;
  const values = [user_id, task, completed, category, notes];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error('❌ DB 오류:', err);
      return res.status(500).json({ error: '서버 오류 발생' });
    }
    res.status(201).json(results);
  });
});

//유저 가입
app.post('/api/register', (req, res) => {
  const { email, name, password, contact } = req.body
  let sql = `INSERT INTO TodoList.users (email, username, password, contact) VALUES (?,?,?,?);`
  let values = [email, name, password, contact]
  conn.query(
    sql,
    values,
    function (err, results) {
      if (err) {
        console.error('❌ DB 오류:', err);
        return res.status(500).json({ error: '서버 오류 발생' });
      }
      res.status(201).json(results);

    }
  );
});

//유저 로그인
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  try {
    // Promise 기반으로 변환하여 async/await 사용
    const results = await new Promise((resolve, reject) => {
      conn.query(sql, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: '아이디와 비밀번호를 확인해주세요.'
      });
    }

    const user = results[0];
    console.log(results);
    //비밀번호 검증 (bcrypt 사용 시)
    // const isValidPassword = await bcrypt.compare(password, user.password);

    // if (!isValidPassword) {
    //   return res.status(401).json({
    //     success: false,
    //     message: '아이디와 비밀번호를 확인해주세요.'
    //   });
    // }

    // JWT 토큰 생성
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 민감한 정보를 제외한 사용자 정보 전송
    const userResponse = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    res.status(200).json({
      success: true,
      message: '로그인 되었습니다.',
      token,
      user: userResponse
    });

  } catch (err) {
    console.error('❌ 서버 오류:', err);
    res.status(500).json({
      success: false,
      error: '서버 오류 발생'
    });
  }
});

app.listen(5000, () => {
  console.log('✅ Express server running on http://localhost:5000');
});

