const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const catchError = require('./code/error');


console.log("apis.GET 진입");

// API 4번: Get my challenge list(미완성)
router.get('/my-challenges', (req, res) => { 
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

// API 5번: Get my challenge list by tag(미완성)
router.get('/tag', (req, res) => { 
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

// API 8번: Get my challenge pin(미완성)
router.get('/pin', (req, res) => { 
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

// API 12번: Get challenge(미완성)
router.get('/challenge', (req, res) => { 
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

// API 14번: get following list(미완성)
router.get('/following', (req, res) => { 
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

// API 17번: Logout(미완성)
router.get('/logout', (req, res) => { 
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

module.exports = router;