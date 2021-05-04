const jwt = require("jsonwebtoken");
const { user } = require("../models");
const catchError = require("./code/error");

module.exports = async (req, res) => {
  console.log("입력값 확인", req.body);
  // console.log("테이블 확인", user);
  const { userId, password, email } = req.body;

  try {
    //입력된 아이디와 이메일로 각각 데이터를 찾음
    const userDataId = await user.findOne({
      where: { user_id: userId },
    });
    const userDataEmail = await user.findOne({
      where: { email: email },
    });
    //아이디나 이메일이 중복되지 않는다면 유저 데이터 생성
    if (!userDataId && !userDataEmail) {
      user.create({ user_id: userId, password: password, email: email });
      res.status(200).send({ message: "Signup succeed" });
    }
    //아이디나 이메일 중 중복되는 값이 이미 데이터베이스에 있다면 에러 메세지 출력
    else {
      res.status(409).send({ message: "Same user existed" });
    }
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
