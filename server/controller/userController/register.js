const express = require('express')
const brcypt = require('bcrypt')

const { pool } = require('../../config/dbConfig')
const { getUserInfoByEmail } = require('./getUserInfo')

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.send({error:"Fill all the fields"})
        }
        else {
            const findEmail = await pool.query(`SELECT * FROM user_register WHERE email =$1`, [email])

            if (findEmail.rows.length > 0) {
                res.send({ error: "Invalid Creds" })
            }
            else {
                const salt = brcypt.genSalt(10)
                const hashedPassword = await brcypt.hash(password, 10)
                const result = await pool.query(`INSERT INTO user_register(email,name,password) VALUES ($1,$2,$3)`, [email, name, hashedPassword])
                const user = await getUserInfoByEmail(email)
                res.send({ message: "Registerd", token: user.token,user:user })
            }
        }
    } catch (error) {
        console.log(error)
        res.send({ error: "Please Try again later",  })

    }
}

module.exports = registerUser