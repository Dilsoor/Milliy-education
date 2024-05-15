const jwt = require('jsonwebtoken')
const { read } = require('../utils/fs')


const students = read('users.json').filter(e => e.role == 'student')
const teachers = read('users.json').filter(e => e.role == 'teacher')
const courses = read('courses.json')
const groups = read('groups.json')
const homeworks = read('homeworks.json')

const Get_student = (req, res) => {
    const {access_token} = req.cookies
    let name
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         name = decode.name
    })
    try {
        res.render('student.ejs', {user: name})
    } catch(err){
        throw new Error(err)
    }
}



const Get_group = (req, res) => {
    const {access_token} = req.cookies
    let name, studentId
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         name = decode.name
        studentId = decode.id
    })

    const student = students.find(e => e.id == studentId)
    const foundGr = groups.filter(e => e.name == student.group)
    const studentTasks = homeworks.filter(e => e.group == student.group)

    try {
        res.render('studentGroup.ejs', {groups: foundGr, tasks: studentTasks, user: name})
    } catch(err){
        throw new Error(err)
    }
}



module.exports = {
    Get_student,
    Get_group

}