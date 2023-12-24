const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Internal route
const { connectDb } = require('./config/dbConfig')
const indexRoute = require('./routes/indexRouter')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', indexRoute)

connectDb()

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`))