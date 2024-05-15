const express = require('express');
const router = express.Router();

const loginControllers = require('../controllers/loginController')
const adminController = require('../controllers/adminController')
const teacherController = require('../controllers/teacherController')
const studentController = require('../controllers/studentController')

// middlewares

const verifyRole = require('../middlewares/verifyRole')
const verifyToken = require('../middlewares/verifyToken')
const verifyRoute = require('../middlewares/verifyRoute')

router
    .get('/',verifyRoute, loginControllers.Login)
    .get('/deleteCookie', loginControllers.Logout)
    .get('/admin', [verifyToken], adminController.Get_admin)
    .get('/adminTeacher', [verifyToken], adminController.Get_teacher)
    .get('/adminStudent', [verifyToken], adminController.Get_student)
    .get('/adminCourse', [verifyToken], adminController.Get_course)
    .get('/adminGroup', [verifyToken], adminController.Get_group)
    .get('/teacher', [verifyToken],  teacherController.Get_teacher)
    .get('/teacherGroup', [verifyToken],  teacherController.Get_group)
    .get('/student',[verifyToken], studentController.Get_student)
    .get('/studentGroup',[verifyToken], studentController.Get_group)
    .post('/login', verifyRole , loginControllers.Login_post)
    .post('/adminTeacher', [verifyToken], adminController.Post_teacher)
    .post('/adminStudent', [verifyToken], adminController.Post_student)
    .post('/adminGroup', [verifyToken], adminController.Post_group)
    .post('/teacherGroup', [verifyToken], teacherController.Post_task)
    .post('/adminCourse', [verifyToken], adminController.Post_course)
    .post('/adminDeleteTeacher', [verifyToken], adminController.Post_deleteteacher)
    .post('/adminDeleteGroup', [verifyToken], adminController.Post_deleteGroup)
    .post('/adminDeleteStudent', [verifyToken], adminController.Post_deleteStudent)
    .post('/adminDeleteCourse', [verifyToken], adminController.Post_deleteCourse)

module.exports = router