const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//라우팅 처리는 컨트롤러의 index.js에서 잡아주기(I did)
const customRouter = require("./routes/router");
//시퀄라이즈 사용
const { sequelize } = require("./models");

const logger = require("./middleware/logger");
const app = express();

// 쿠키 설정(순서 중요)
// [TASK]CORS 설정 #3
app.use(
  session({
    secret: "@CoDeMon",
    resave: false,
    saveUninitialized: true,
    //테스트용 유저 아이디
    userId: 3,
    cookie: {
      domain: "localhost;",
      path: "/",
      maxAge: 24 * 6 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*", // 확인사항
    credentials: true, // 확인사항
  })
);

// Init middleware
app.use(logger); // 첫번째 middleware, 접속한 링크의 주소를 console.log로 출력합니다.

const PORT = process.env.PORT || 3000;

console.log("/login 이전");

//컨트롤러로 전부 넘겨서 라우팅 시키기
app.use("/", customRouter);

//false를 true로 할 시 서버 실행시마다 테이블을 재생성
sequelize
  .sync({ force: false })
  .then(() => console.log("db접속 성공"))
  .catch((err) => console.log(err));

// http 파트
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
