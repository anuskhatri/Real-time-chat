const express = require('express')
const { getUserInfoById } = require('./getUserInfo')

const findUser = async(req, res) => {
    try {

        const userId = req.params.userId
        const user = await getUserInfoById(userId)
        res.send({ message: "found user", userData: user })

    } catch (error) {
        res.send({ error: "Server error", error: error })

    }
}

module.exports = findUser