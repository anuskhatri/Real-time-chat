const { pool } = require('../../config/dbConfig')

const createMessage = async (req,res) => {
    const { senderId, message, chatId } = req.body
    try {
        const userMessage = await pool.query(`INSERT INTO message(sender_id,message,chat_id) VALUES($1,$2,$3) RETURNING *`, [senderId, message, chatId])
        console.log(userMessage.rows[0])
        res.send(userMessage.rows[0])       
    } catch (error) {
        console.log(error)
        res.send({error:"Try again later"})
    }
}

module.exports=createMessage