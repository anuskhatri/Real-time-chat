const { pool } = require('../../config/dbConfig')

const   createChat = async (req, res) => {
    const { firstId, secondId } = req.body
    try {
    
        const chat = await pool.query(`SELECT * FROM chats WHERE members @> $1`, [[firstId, secondId]])
        if(chat.rows.length>0) return res.send(chat.rows)

        const response = await pool.query(`INSERT INTO chats(members) VALUES($1) RETURNING *`,[[firstId,secondId]])
        return res.send(response.rows)
    } 
    catch (error) {
        console.log(error)
        res.send({ error: "Try again later" })
    }
}

module.exports= createChat