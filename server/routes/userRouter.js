// External imports
const express = require('express')
const userRoute = express.Router()

// Internal imports
const registerUser = require('../controller/userController/register')
const loginUser = require('../controller/userController/login')
const findUser = require('../controller/userController/findUser')
const getUser = require('../controller/userController/getUser')
const {getUserInfoByToken} = require('../controller/userController/getUserInfo')

userRoute.post('/user_data',getUserInfoByToken)
userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)
userRoute.get('/find/:userId', findUser)
userRoute.get('/', getUser)

module.exports = userRoute