const express = require('express')
const messageRoute = express.Router()

const createMessage = require('../controller/messageController/createMessage')
const getMessage = require('../controller/messageController/getMessage')

messageRoute.post('/', createMessage)
messageRoute.get('/:chatId', getMessage)

module.exports = messageRoute