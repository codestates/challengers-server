const jwt = require("jsonwebtoken");
const { user } = require("../models");
const catchError = require("./code/error");

module.exports = async (req, res) => {
  console.log("입력값 확인", req.body);
  console.log("세션 확인", req.session);
  const { oldPassword, newPassword, email } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  //사용자 데이터를 찾고 이를 수정
  try {
    /*로그인 된 후 기본적인 유저 확인 과정*/
    const valCheck = await jwt.verify(token, process.env.SALT);
    //세션 자체가 없을때
    if (!req.session.userId) {
      res.status(401).send({ message: "Unauthorized action detected" });
    }
    //세션 토큰 다 있는데 이상한 세션 id값(토큰에 있는값과 다른값)으로 접근 하려 할때
    if (valCheck.id !== req.session.userId) {
      res.status(401).send({ message: "Unauthorized action detected" });
    }

    //토큰,세션 검사를 통과한 후의 로직

    //유저의 정보를 pk값과 이메일로 데이터베이스에서 검색
    const userData = await user.findOne({
      where: { id: valCheck.id },
    });
    const userDataByEmail = await user.findOne({
      where: { email: email },
    });

    //입력된 패스워드가 유저의 패스워드와 다르다면
    if (userData.password !== oldPassword) {
      res
        .status(401)
        .send({ message: "Password is different from old password" });
    } else {
      //패스워드까지 맞게 입력되었지만 자기 email과 동일하다면
      if (userData.email === userDataByEmail.email) {
        res.status(409).send({
          message: "You already use this email that you try to change",
        });
      }
      //다른 유저가 사용중인 이메일을 입력하였다면
      else if (userData.id !== userDataByEmail.id) {
        res.status(409).send({ message: "Email is already existed" });
      } else {
        //기존 패스워드를 맞게 입력했고 중복되지 않은 이메일로 변경요청을 하였을때, 정상처리 과정
        user.update(
          {
            password: newPassword, //바뀔 패스워드
            email: email, //바뀔 이메일값
          },
          {
            where: { id: userData.id },
          }
        );
        res.status(201).send({ message: "Update succeed" });
      }
    }
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
