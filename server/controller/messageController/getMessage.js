const { pool } = require('../../config/dbConfig')

const getMessage = async (req, res) => {
    const { chatId } = req.params
    try {
        const userMessage = await pool.query(`SELECT * FROM message WHERE chat_id = $1`, [chatId])
        res.send(userMessage.rows   )       

    } catch (error) {
        console.log(error)
        res.send({error:"Try again later"})
    }
}

module.exports= getMessage