const express = require('express');
const session = require('express-session');
const cors = require('cors'); 
require('dotenv').config();

const logger = require('./middleware/logger');
const app = express();

// 쿠키 설정(순서 중요)
// [TASK]CORS 설정 #3
app.use(
    session({
      secret: '@codestates',
      resave: false,
      saveUninitialized: true,
      cookie: {
        domain: 'localhost;',
        path: '/',
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: 'none',
        httpOnly: true,
        secure: true,
      },
    })
  );


app.use(express.json());

app.use(cors({
    origin: "*", // 확인사항
    credentials: true // 확인사항
  }));


// Init middleware
app.use(logger); // 첫번째 middleware, 접속한 링크의 주소를 console.log로 출력합니다.

// app.get('/', (req, res) => { // 사용자가 root로 접속하면 Hello World를 띄운다.
//     res.send({mes : 'Hello World'});
// });

console.log("/login 이전")

app.use('/', require('./routes/api/apis_get'));// GET 관련 처리
app.use('/', require('./routes/api/apis_post'));// POST 관련 처리
app.use('/', require('./routes/api/apis_delete'));// DELETE 관련 처리
app.use('/', require('./routes/api/apis_put'));// PUT 관련 처리




const PORT = process.env.PORT || 3000;



// http 파트
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})