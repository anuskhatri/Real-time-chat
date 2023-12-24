const { pool } = require('../../config/dbConfig')

const getUserChat = async (req, res) => {
    const userId = req.params.userId
    try {
        const chat = await pool.query(`SELECT * FROM chats WHERE $1 = ANY(members)`, [userId])
        if (chat.rows.length > 0) return res.send(chat.rows)
        res.send({ error: "No chat found" })
    }
    catch (error) {
        console.log(error)
        res.send({ error: "Try again later" })
    }
}

module.exports = getUserChat