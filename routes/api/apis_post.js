const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const catchError = require('./code/error');


console.log("apis.POST 진입");

// API 1번 : login요청(미완성)
router.post('/login', (req, res) => { 
    // postman으로 통신 확인. DB조회 추가 필요
    console.log(req.body);


    
    // 로그인 성공시 else문 실행
    if(true){

        // token 생성(jwt token)
        const token = jwt.sign(
        req.body, 
        process.env.SALT,
        { expiresIn: '60s' });

        console.log(token);
        // 응답헤더 설정(쿠기에 token 추가)
        res.setHeader('set-cookie','token', token);
        
        // session을 서버에 저장
        req.session.save((err) => {
            // 아래코드는 DB와 조회가 가능해지면 수정해야함
            req.session.userId = req.body.userId;
            console.log('req.session.userId 서버에 저장 : ', req.session.userId);
            res.status(200);
            res.send({
                body: {
                    message : "Login succeed"
                }
            })
        })

        }

    // 데이터베이스 안에 요청 유저의 정보가 없을 때
    else if(false){
        res.status(400);
        res.send({body : {message : 'User is not existed'}});
    }

    // password 틀렸을때
    else if(false){
        res.status(401);
        res.send({body : {message : 'You have wrong password'}});
    }

    // 서버에러일때
    else if(false){
        res.status(500);
        res.send({body : {message : 'Server error occurred '}});
    }

});

// API 2번 : signup요청(미완성)
router.post('/signup', (req, res) => { 
    // postman으로 통신 확인. DB조회 추가 필요
    // DB에 회원정보 저장하는 Logic 필요

    res.send(req.body);

});

// API문서 6번 - Create new challenge요청(미완성)
router.post('/challenge', (req, res) => { 
    // postman으로 통신 확인. DB조회 추가 필요
    console.log('authorization', req.headers.authorization);
    const token = req.headers.authorization;
    try{
        const data = jwt.verify(token, process.env.SALT);
        console.log(data);
        res.send(req.body);
    }
    catch(err){
        // error 발생시 처리
        catchError.err(err, res);
        console.error(err);
    }
    


    

});

// API문서 9번 - add challenge pin요청(미완성)
router.post('/pin', (req, res) => { 
    // postman으로 통신 확인. DB조회 추가 필요
    // postman으로 통신 확인. DB조회 추가 필요
    console.log('authorization(post -> /pin) : ', req.headers.authorization);
    const token = req.headers.authorization;
    try{
        const data = jwt.verify(token, process.env.SALT);
        console.log(data);
        res.send(req.body);
    }
    catch(err){
        // error 발생시 처리
        catchError.err(err, res);
        console.error(err);
    }



});

// API문서 13번 - add like요청(미완성)
router.post('/like', (req, res) => { 
    // postman으로 통신 확인. DB조회 추가 필요
    console.log('authorization(post -> /like) : ', req.headers.authorization);
    const token = req.headers.authorization;
    try{
        const data = jwt.verify(token, process.env.SALT);
        console.log(data);
        res.send(req.body);
    }
    catch(err){
        // error 발생시 처리
        catchError.err(err, res);
        console.error(err);
    }

});

// API문서 15번 - add following요청(미완성)
router.post('/following', (req, res) => { 
    // postman으로 통신 확인. DB조회 추가 필요
    console.log('authorization(post -> /like) : ', req.headers.authorization);
    const token = req.headers.authorization;
    try{
        const data = jwt.verify(token, process.env.SALT);
        console.log(data);
        res.send(req.body);
    }
    catch(err){
        // error 발생시 처리
        catchError.err(err, res);
        console.error(err);
    }

});

module.exports = router;