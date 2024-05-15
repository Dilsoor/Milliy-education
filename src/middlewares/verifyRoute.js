const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const {access_token} = req.cookies


     if(access_token){
        jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
            if(!err){
                if(decode.role == 'admin'){
                    return  res.redirect('/admin')
                }

                if(decode.role == 'student'){
                    return  res.redirect('/student')
                }

                if(decode.role == 'teacher'){
                    return  res.redirect('/teacher')
                }
            } else {
                next()
            }
        })
     } else {
         next()
     }
}