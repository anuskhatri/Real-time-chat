const {Pool} = require('pg')

const pool = new Pool({
    "user":"postgres",
    "host":"localhost",
    "port":"5432",
    "database":"RealtimeChat",
    "password":"khatri15"
})

const connectDb=()=>{
    try {
        pool.connect()
        console.log("Database connected")
    } catch (error) {
      console.log(error)  
    }
}

module.exports={pool,connectDb}