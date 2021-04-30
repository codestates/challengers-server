    
const catchError = {
    err : (err, res) => {
        if(err.message === 'jwt expired' || 
           err.message === 'jwt must be provided' ||
           err.message === 'invalid signature'){
            res.status(401); // 
            res.send({
                body: {
                    message : "Unauthorized action detected"
                }
            })
        }

        // status : 500 - 서버에러로 응답 처리 불가
        else {
            res.status(500); // 
            res.send({
                body: {
                    message : "Server error occurred"
                }
            })
        }
    }
}
    

module.exports = catchError;