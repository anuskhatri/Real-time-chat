const { Pool } = require('pg')

const pool = new Pool({

    "user": process.env.DBUSER,
    "host": process.env.DBHOST, 
    "port":process.env.DBPORT,
    "database":process.env.DBNAME,
    "password":process.env.DBPASSWORD,
})

const connectDb = () => {
    try {
        pool.connect()
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { pool, connectDb }