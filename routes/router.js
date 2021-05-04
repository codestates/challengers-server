var express = require("express");
var router = express.Router();

const controllers = require("../controllers");

//root 도메인으로 get 요청시 hello world 출력
router.get("/", (req, res) => res.send("hello world"));
//나머지 라우팅 처리들
router.post("/login", controllers.login);
router.post("/signup", controllers.signup);
router.put("/change-info", controllers.changeinfo);

router.get("/main", controllers.main);
// router.get("/my-challenges", controllers.myChallenges);
// router.get("/tag", controllers.tag);

// router.post("/challenge", controllers.challenge.post);
// router.delete("/challenge", controllers.challenge.delete);
// router.get("/challenge", controllers.challenge.get);

// router.get("/pin", controllers.pin.getList);
// router.post("/pin", controllers.pin.post);
// router.delete("/pin", controllers.pin.delete);

// router.delete("/pinlist", controllers.pinlist);

// router.post("/like", controllers.like);

// router.get("/following", controllers.following.get);
// router.post("/following", controllers.following.add);
// router.delete("/following", controllers.following.delete);

// router.get("/logout", controllers.logout);

module.exports = router;
