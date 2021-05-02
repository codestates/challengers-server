const jwt = require("jsonwebtoken");
const { user } = require("../models");
const catchError = require("./code/error");

module.exports = async (req, res) => {
  console.log("헤더 확인", req.headers);

  const token = req.headers.authorization.split(" ")[1];
  //사용자 데이터를 찾고 해당 세션 파괴
  try {
    /*로그인 된 후 기본적인 유저 확인 과정*/
    const valCheck = await jwt.verify(token, process.env.SALT);
    //세션 자체가 없을때
    if (!req.session.userId) {
      res.status(401).send({ message: "Unauthorized action detected" });
    }
    //세션 토큰 다 있는데 이상한 세션 id값으로 접근 하려 할때
    if (valCheck.id !== req.session.userId) {
      res.status(401).send({ message: "Unauthorized action detected" });
    }

    //정상 로그아웃 과정
    else {
      req.session.destroy();
      res.status(200).send({ message: "Logout succeed" });
    }
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
