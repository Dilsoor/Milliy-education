const { read } = require('../utils/fs')


module.exports = (req, res, next) => {
    
    const { name, password } = req.body
    const foundUser = read('users.json').find(e => e.username == name && e.password == password)
    if(!foundUser) {
        return res.sendStatus(401)
    }

    req.user = foundUser
    next()
}