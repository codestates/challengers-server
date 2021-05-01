var express = require("express");
var router = express.Router();

const controllers = require("../controllers");

//root 도메인으로 get 요청시 hello world 출력
router.get("/", (req, res) => res.send("hello world"));
//나머지 라우팅 처리들
router.get("/my-challenges", controllers.myChallenges);

module.exports = router;
