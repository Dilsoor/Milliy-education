const {read, write} = require('../utils/fs')
const jwt = require('jsonwebtoken')

const students = read('users.json').filter(e => e.role == 'student')
const teachers = read('users.json').filter(e => e.role == 'teacher')
const courses = read('courses.json')
const groups = read('groups.json')


const Get_admin = (req, res) => {
    const {access_token} = req.cookies
        let name
        jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
             name = decode.name
        })
        try {
            res.render('admin.ejs', { students: students, teachers: teachers, user:name})
        } catch(err){
            throw new Error(err)
        }
}

const Get_teacher = (req, res) => {
    const {access_token} = req.cookies
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         try {
             res.render('adminTeacher.ejs', { teachers: teachers, courses: courses, user:decode.name})
         } catch(err){
             throw new Error(err)
         }
    })
}




const Get_student = (req, res) => {
    const {access_token} = req.cookies
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         try {
             res.render('adminStudent.ejs', { students: students, groups: groups, user:decode.name})
         } catch(err){
             throw new Error(err)
         }
    })
}

const Get_course = (req, res) => {
    const {access_token} = req.cookies
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         try {
             res.render('adminCourse.ejs', { courses: courses, user:decode.name})
         } catch(err){
             throw new Error(err)
         }
    })
}

const Get_group = (req, res) => {
    const {access_token} = req.cookies
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
         try {
             res.render('adminGroup.ejs', { courses: courses, groups: groups, teachers: teachers, user:decode.name})
         } catch(err){
             throw new Error(err)
         }
    })
}


///////  POST  ////////


const Post_deleteteacher = (req, res) => {
    const {access_token} = req.cookies
    const id  = req.body.id
    const foundUsers = read('users.json').filter(e => e.id != id)
    write('users.json', foundUsers)

    const foundTeachers = read('users.json').filter(e => e.role == 'teacher')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminTeacher.ejs', { teachers: foundTeachers, courses: courses, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}


const Post_deleteStudent = (req, res) => {
    const {access_token} = req.cookies
    const id  = req.body.id
    const foundUsers = read('users.json').filter(e => e.id != id)
    write('users.json', foundUsers)

    const foundStudents = read('users.json').filter(e => e.role == 'student')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminStudent.ejs', { students: foundStudents, groups: groups, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}

const Post_deleteGroup = (req, res) => {
    const {access_token} = req.cookies
    const id  = req.body.id
    const foundGroups = read('groups.json').filter(e => e.id != id)
    write('groups.json', foundGroups)

    const Groups = read('groups.json')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminDeleteGroup.ejs', {courses: courses, groups: Groups, teachers: teachers, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}

const Post_deleteCourse = (req, res) => {
    const {access_token} = req.cookies
    const id  = req.body.id
    const foundCourse = read('courses.json').filter(e => e.id != id)
    write('courses.json', foundCourse)

    const Course = read('courses.json')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminDeleteCourse.ejs', {courses: Course, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}

const Post_teacher = (req, res) => {
    const {access_token} = req.cookies
    const teacherdata = req.body
    const users = read('users.json')
    const teacher ={
        id: users[users.length - 1].id + 1,
        name: teacherdata.name,
        username: teacherdata.username,
        password: teacherdata.password,
        phoneNumber: teacherdata.phoneNumber,
        role: "teacher",
        course: teacherdata.course
    }
    users.push(teacher)
    write('users.json', users)

    const foundTeachers = read('users.json').filter(e => e.role == 'teacher')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminTeacher.ejs', { teachers: foundTeachers, courses: courses, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}

const Post_student = (req, res) => {
    const {access_token} = req.cookies
    const studentdata = req.body
    const studentCourse = groups.find(e => e.name == studentdata.group).course
    const users = read('users.json')
    const student = {
        id: users[users.length - 1].id + 1,
        name: studentdata.name,
        username: studentdata.username,
        password: studentdata.password,
        phoneNumber: studentdata.phoneNumber,
        role: "student",
        course: studentCourse,
        group: studentdata.group
    }
    users.push(student)
    write('users.json', users)

    const foundStudents = read('users.json').filter(e => e.role == 'student')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminStudent.ejs', { students: foundStudents, groups: groups, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}

const Post_group = (req, res) => {
    const {access_token} = req.cookies
    const groupdata = req.body
    const groups = read('groups.json')
    const group = {
        id: groups[groups.length - 1].id + 1,
        name: groupdata.name,
        course: groupdata.course,
        teacher: groupdata.teacher
    }
    groups.push(group)
    write('groups.json', groups)

      const foundGroups = read('groups.json')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminGroup.ejs', { courses: courses, teachers: teachers, groups: foundGroups, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}

const Post_course = (req, res) => {
    const {access_token} = req.cookies
    const coursedata = req.body
    const courses = read('courses.json')
    const course = {
        id: courses[courses.length - 1].id + 1,
        name: coursedata.name,
        price: coursedata.price
    }
    courses.push(course)
    write('courses.json', courses)

      const foundcourses = read('courses.json')
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        try {
                res.render('adminCourse.ejs', { courses: foundcourses, user:decode.name})

        } catch(err){
             throw new Error(err)
        }
    })
}


module.exports = {
    Get_admin,
    Get_teacher,
    Get_student,
    Get_course,
    Get_group,
    Post_teacher,
    Post_student,
    Post_course,
    Post_deleteteacher,
    Post_deleteStudent,
    Post_group,
    Post_deleteGroup,
    Post_deleteCourse
}