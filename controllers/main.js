const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const { user, challenge, like } = require("../models");
const catchError = require("./code/error");

module.exports = async (req, res) => {
  console.log("헤더 확인", req.headers);
  console.log("세션", req.session);
  console.log("오리지날 세션 아이디", req.session.userId);
  // const token = req.headers.authorization.split(" ")[1];
  //사용자 데이터를 찾고 이를 수정
  try {
    console.log("수정된 방법의 세션 아이디", req.headers.usersessionid);
    // /*로그인 된 후 기본적인 유저 확인 과정*/
    // const valCheck = await jwt.verify(token, process.env.SALT);
    // //세션 자체가 없을때
    // if (!req.header.userSessionId) {
    //   res.status(401).send({ message: "Unauthorized action detected" });
    // }
    // //세션 토큰 다 있는데 이상한 세션 id값(토큰에 있는값과 다른값)으로 접근 하려 할때
    // if (valCheck.id !== req.header.userSessionId) {
    //   res.status(401).send({ message: "Unauthorized action detected" });
    // }

    //토큰,세션 검사를 통과한 후의 로직(필요없음)

    //토큰속의 유저데이터를 토대로 필요한 값 추출
    //일단 여기까지 하면 해당 챌린지 like한 데이터들이 같이 나옴

    const tagList = await challenge.findAll({
      //방법1 > 1대n 관계에서 테이블을 join하고 내림차순 정렬 (limit만 실패함)
      //전체 컬럼중에서 likes 컬럼의 id컬럼을 가지고 카운트, 그리고 새로운 컬럼 이름은 totalLike
      attributes: {
        include: [
          [sequelize.fn("count", sequelize.col("likes.id")), "totalLike"],
        ],
      },
      //like테이블을 조인한다
      include: [
        {
          model: like,
          attributes: [],
        },
      ],
      //챌린지의 아이디를 fk로 가지는 친구들을 group by
      group: ["challenge.id"],
      //라이크 많은 순에서 적은순으로
      //결국 뒤쪽은 리터럴 처리...
      //좀더 공부합시다
      order: sequelize.literal("totalLike desc limit 5"),
      // limit: 2,
      // offset: 1,
      // seperate: true,
    });

    //   //방법 2(성공!)
    //   //attribute안에는 가져올 컬럼 범위를 지정
    //   //limit로 5개 제한
    //   //include를 통해 카운트 처리를 하는데 like 테이블의 id를 기준점으로 카운트할것임
    //   attributes: {
    //     include: [
    //       [sequelize.fn("count", sequelize.col("likes.id")), "totalLike"],
    //     ],
    //   },
    //   //include안에는 조인 되는 테이블에 대한 정보
    //   //like라는 테이블을 조인하고 attribute로 like내 모든 컬럼 선택
    //   include: [
    //     {
    //       model: like,
    //       attributes: [],
    //       // where: { challenge_id: sequelize.col("challenge.id") },
    //     },
    //   ],
    //   //group 안에는 그룹바이 처리를 할 컬럼을 작성
    //   //조인된 이후에 like들을 challenge의 id값별로 그룹지어줌
    //   group: ["challenge.id"],
    //   // order: [["totalLike", "desc"]],
    //   // limit: 2,
    //   // order: [[sequelize.fn("max", sequelize.col("totalLike")), "desc"]],
    // });
    // console.log("태그 리스트", tagList);
    const challengerList = await challenge.findAll({
      //방법1 > 1대n 관계에서 테이블을 join하고 내림차순 정렬 (limit 성공함 - literal로...)
      //전체 컬럼중에서 likes 컬럼의 id컬럼을 가지고 카운트, 그리고 새로운 컬럼 이름은 totalLike
      // attributes: {
      //   include: [
      //     [sequelize.fn("count", sequelize.col("likes.id")), "totalLike"],
      //   ],
      // },
      //like테이블을 조인한다
      include: [
        {
          model: user,
          // arttributes: ["user_id"],
          // include: [
          //   {
          //     model: like,
          //   },
          // ],
        },
      ],
      //챌린지의 아이디를 fk로 가지는 친구들을 group by
      // group: ["challenge.id"],
      //라이크 많은 순에서 적은순으로
      //결국 뒤쪽은 리터럴 처리...
      //좀더 공부합시다
      // order: sequelize.literal("totalLike desc limit 5"),
    });
    // console.log("챌린지 리스트", challengeList)
    res.status(234).send({ mark1: tagList });
  } catch (err) {
    catchError.err(err, res);
    console.error(err);
  }
};
