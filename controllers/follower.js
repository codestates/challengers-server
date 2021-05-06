const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const { user, user_user } = require("../models");
const catchError = require("./code/error");

module.exports = async (req, res) => {
  console.log("헤더 확인", req.header);
  //   const token = req.headers.authorization.split(" ")[1];
  //사용자 데이터를 찾고 이를 수정
  try {
    // /*로그인 된 후 기본적인 유저 확인 과정*/
    // const valCheck = await jwt.verify(token, process.env.SALT);
    // //세션 자체가 없을때
    // if (!req.session.userId) {
    //   res.status(401).send({ message: "Unauthorized action detected" });
    // }
    // //세션 토큰 다 있는데 이상한 세션 id값(토큰에 있는값과 다른값)으로 접근 하려 할때
    // if (valCheck.id !== req.session.userId) {
    //   res.status(401).send({ message: "Unauthorized action detected" });
    // }

    //토큰,세션 검사를 통과한 후의 로직(필요없음)

    //토큰속의 유저데이터를 토대로 필요한 값 추출
    //일단 여기까지 하면 해당 챌린지 like한 데이터들이 같이 나옴

    const followedList = await user.findAll({
      //방법1 > 1대n 관계에서 테이블을 join하고 내림차순 정렬 (limit만 실패함)
      //where 절 아이디는 토큰에서 뽑아온 값으로
      //전체 컬럼중에서 user_user 테이블의 id컬럼을 가지고 카운트, 그리고 새로운 컬럼 이름은 totalfollow
      where: { id: 3 },
      attributes: {
        include: [
          [
            sequelize.fn("count", sequelize.col("user_users.id")),
            "totalFollow",
          ],
        ],
      },
      //user_user테이블을 조인한다
      include: [
        {
          model: user_user,
          attributes: [],
        },
      ],
      //유저의 아이디를 fk로 가지는 친구들을 group by
      group: ["user.id"],
      //라이크 많은 순에서 적은순으로
      //결국 뒤쪽은 리터럴 처리...
      //좀더 공부합시다
      order: sequelize.literal("totalFollow desc limit 5"),
      // limit: 2,
      // offset: 1,
      // seperate: true,
    });

    const followingList = await user_user.findAll({
      where: { user_id: 2 },
      // attributes: ["id"],
      // group: ["user_id"],
    });

    res.send({
      someoneWhoFollowMe: followedList,
      // someoneWhoIFollow: followingList,
    });
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
