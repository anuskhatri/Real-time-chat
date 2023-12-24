const express = require('express')
const indexRoute = express.Router()

const userRoute = require('../routes/userRouter')
const chatRoute = require('./chatRouter')
const messageRoute = require('./messageRouter')

indexRoute.use('/user', userRoute)
indexRoute.use('/chat', chatRoute)
indexRoute.use('/message', messageRoute)

module.exports = indexRoute