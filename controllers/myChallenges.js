const jwt = require("jsonwebtoken");
const { challenge, user } = require("../models");

module.exports = async (req, res) => {
  console.log("파라미터 확인", req.query);
  console.log("테이블 확인", user);
  //모든 챌린지를 가져올건데, user 테이블의 user_id가 요청값으로 오는 것과 같은 모든 챌린지들을 선택
  const myChallenge = await challenge.findAll({
    include: [
      {
        model: user,
        where: { user_id: req.query.userId },
      },
    ],
  });
  res.send(myChallenge);
};
