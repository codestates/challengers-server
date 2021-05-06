const jwt = require("jsonwebtoken");
require("dotenv").config();
const { challenge, user } = require("../models");

module.exports = async (req, res) => {
  try {
    console.log("세션", req.session);
    console.log("세션 아이디", req.session.userId);
    // console.log("헤더 확인", req.headers);
    // const token = req.headers.cookie.split("=")[1];
    // // console.log("테이블 확인", user);
    // /*로그인 된 후 기본적인 유저 확인 과정*/
    // const valCheck = await jwt.verify(token, process.env.SALT);
    // //세션 자체가 없을때
    // if (!req.session.userId) {
    //   res.status(401).send({ message: "Unauthorized action detected" });
    // }
    // //세션 토큰 다 있는데 이상한 세션 id값으로 접근 하려 할때
    // else if (valCheck.id !== req.session.userId) {
    //   res.status(401).send({ message: "Unauthorized action detected" });
    // } else {
    //정상 쿼리 과정
    const userData = await user.findOne({
      where: { id: valCheck.id },
    });
    if (!userData) {
      res.status(400).send({ message: "User id is not existed" });
    } else {
      //모든 챌린지를 가져올건데, user 테이블의 user_id가 요청값으로 오는 것과 같은 모든 챌린지들을 선택
      const myChallengeList = await challenge.findAll({
        limit: 100,
        include: [
          {
            model: user,
            where: { user_id: 1 },
          },
        ],
      });
      res.status(200).send({
        body: myChallengeList,
        message: "Get your challenge list succeed",
      });
    }
    // }
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
