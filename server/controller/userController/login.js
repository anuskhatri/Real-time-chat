const express = require('express')
const brcypt = require('bcrypt')

const { pool } = require('../../config/dbConfig')
const { getUserInfoByEmail } = require('./getUserInfo')

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.send({ error: "Fill all fields" })
        }
        else {

            const user = await getUserInfoByEmail(email)
            if (user) {
                const isValidPassword = await brcypt.compare(password, user.password)
                if (isValidPassword) {
                    res.send({ message: "Registerd", token: user.token,user:user })
                }
                else {
                    res.status(200).send({ error: "Invalid credentials" })
                }
            }
            else {
                res.status(200).send({ error: "Invalid credentials" })
            }
        }

    } catch (error) {
        console.log(error)
        res.send({ message: "Sever error", error: error })
    }
}

module.exports = loginUser