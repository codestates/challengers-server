const jwt = require("jsonwebtoken");
require("dotenv").config();
const { user } = require("../models");
const catchError = require("./code/error");
// const session = require("express-session");

module.exports = async (req, res) => {
  console.log("입력값 확인", req.body);
  //   console.log("테이블 확인", user);
  const { userId, password } = req.body;
  try {
    //유저 아이디를 가지고 유저 정보를 쿼리
    const userData = await user.findOne({
      where: { user_id: userId },
    });
    if (!userData) {
      res.status(400).send({ message: "User is not existed" });
    } else {
      console.log("user 데이터", userData);
      //들어온 패스워드가 유저 데이터의 패스워드와 일치하지 않을때
      if (userData.password !== password) {
        res.status(401).send({ message: "You have wrong password" });
      } else {
        //토큰 만들기 위한 준비작업
        const { id, user_id, email } = userData;
        const payload = {
          id,
          user_id,
          email,
        };
        //토큰 생성
        const token = jwt.sign(payload, process.env.SALT, { expiresIn: "10m" });
        console.log("토큰", token);

        //세션 전달 (유저의 pk값으로 저장)
        //토큰 전달
        req.session.save(() => {
          req.session.userId = id;
          console.log("세션 확인", req.session.userId);
          res.cookie("token", token);
          // res.redirect("/");
          console.log("서버에서 보내는 세션", req.session);
          res.status(200).send({ message: "login succeed", sessionId: id });
        });
      }
    }
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
