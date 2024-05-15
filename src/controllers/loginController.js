const { sign } = require('../utils/jwt')


module.exports = {
    Login: (_,res) => {
        try {
            res.render('login.ejs')
        } catch(err) {
            throw new Error(err)
        }
    },
    Login_post: (req,res) => {
        const { user } = req

        if(user.role == 'teacher') {
            res.cookie('access_token', sign({ id: user.id, role: user.role, name: user.name }), {
                maxAge: 12 * 60 * 60 * 1000
            })
            res.redirect('/teacher')
        }

        if(user.role == 'student') {
            res.cookie('access_token', sign({ id: user.id, role: user.role, name: user.name }), {
                maxAge: 12 * 60 * 60 * 1000
            })
            res.redirect('/student')
        }

        if(user.role == 'admin') {
            res.cookie('access_token', sign({ id: user.id, role: user.role, name: user.name }), {
                maxAge: 12 * 60 * 60 * 1000
            })
            res.redirect('/admin',  )
        }
    },

    Logout: (_,res) => {
        res.clearCookie('access_token')
        res.redirect('/')
    }
}