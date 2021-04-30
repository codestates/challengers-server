const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const catchError = require('./code/error')

console.log("apis.PUT 진입");

// API 3번: Change info(미완성)
router.put('/change-info', (req, res) => { 
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