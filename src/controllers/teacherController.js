const jwt = require('jsonwebtoken')
const { read, write } = require('../utils/fs')


const groups = read('groups.json')
const teachers = read('users.json').filter(e => e.role == 'teacher')


const Get_teacher = (req, res) => {
    const {access_token} = req.cookies
    let name
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         name = decode.name
    })

    try {
        res.render('teacher.ejs', {user: name})
    } catch(err){
        throw new Error(err)
    }
}

const Get_group = (req, res) => {

    const {access_token} = req.cookies
    let name
    let teacherId
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         name = decode.name
         teacherId = decode.id

    })
    const teacher = teachers.find(e => e.id == teacherId)
    const teacherGroups = groups.filter(e => e.course == teacher.course)
    try {
        res.render('teacherGroup.ejs', { groups:teacherGroups,  user: name})
    } catch(err){
        throw new Error(err)
    }
}

const Post_task = (req, res) => {

    const {access_token} = req.cookies
    const taskdata = req.body
    const tasks = read('homeworks.json')
    const task = {
        id: tasks[tasks.length - 1]?.id + 1,
        desc: taskdata.homework,
        group: taskdata.group
    }
    tasks.push(task)
    write('homeworks.json', tasks)
    let name, teacherId
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         name = decode.name
         teacherId = decode.id

    })

    const teacher = teachers.find(e => e.id == teacherId)
    const teacherGroups = groups.filter(e => e.course == teacher.course)
    try {
        res.render('teacherGroup.ejs', { groups:teacherGroups,  user: name})
    } catch(err){
        throw new Error(err)
    }
}



module.exports = {
    Get_teacher,
    Get_group,
    Post_task
}