const express = require('express')
const chatRoute=express.Router()

const createChat = require('../controller/chatController/createChat')
const findUserChat = require('../controller/chatController/findChat')
const getUserChat = require('../controller/chatController/getUserChat')

chatRoute.post('/',createChat)
chatRoute.get('/:userId',getUserChat)
chatRoute.get('/find/:firstId/:secondId',findUserChat)

module.exports=chatRoute