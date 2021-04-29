const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');
const app = express();

// Init middleware
app.use(logger); // 첫번째 middleware, 접속한 링크의 주소를 console.log로 출력합니다.

app.get('/', (req, res) => { // 사용자가 root로 접속하면 Hello World를 띄운다.
    res.send({mes : 'Hello World'});
});





const PORT = process.env.PORT || 5000;

// http://localhost:5000/
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})