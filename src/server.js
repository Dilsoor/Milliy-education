require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routers/routers')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

app.use('/', router)

app.listen(8000, console.log(8000))