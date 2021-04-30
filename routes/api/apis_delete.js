const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const catchError = require('./code/error')

console.log("apis.DELETE 진입");

// API 7번: Delete my challenge(미완성)
router.delete('/challenge', (req, res) => { 
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

// API 10번: Delete challenge pin(미완성)
router.delete('/pin', (req, res) => { 
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

// API 11번: Delete pin list(미완성)
router.delete('/pinlist', (req, res) => { 
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

// API 16번: Delete following(미완성)
router.delete('/following', (req, res) => { 
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