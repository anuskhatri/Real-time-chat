const jwt = require('jsonwebtoken')
const { verifyReceToken } = require('../../middleware/jwtDecode')

const { pool } = require('../../config/dbConfig')

const getUserInfoByEmail = async (email) => {

    const result = await pool.query(`SELECT * FROM user_register WHERE email =$1`, [email])
    if (result.rows.length > 0) {

        const userid = result.rows[0].id
        const jwt_secret = process.env.JWT_SECRET_KEY
        const user_token = jwt.sign({ userid }, jwt_secret, { expiresIn: "3d" })

        return { name: result.rows[0].name, token: user_token, password:result.rows[0].password }
    }
    else return null
}

const getUserInfoById = async (id) => {
    const result = await pool.query(`SELECT * FROM user_register WHERE id =$1`, [id])
    const user = result.rows[0]
    if (result.rows.length > 0) {
        return user
    }
    else return null
}

const getUserInfo = async () => {
    const result = await pool.query(`SELECT * FROM user_register`)
    const user = result.rows
    if (result.rows.length > 0) {
        return user
    }
    else return null
}


const getUserInfoByToken = async(req, res) => {
    try {
        const token= req.body.token
        const decodedData = verifyReceToken(token)
        if (decodedData?.error) {
            return res.send({ error: "Not valid" })
        }
        const user = await getUserInfoById(decodedData.userId)
        return res.send(user)

    } catch (error) {
        console.log(error)
        return res.send({ error: "Please Try again later", })
    }
}

module.exports = { getUserInfoByEmail, getUserInfoById,getUserInfo,getUserInfoByToken }