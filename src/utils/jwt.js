const jwt = require('jsonwebtoken')


const sign = (payload) => jwt.sign(payload, process.env.SECRET_KEY , {
    expiresIn: '12h'
})
module.exports = {
    sign
}