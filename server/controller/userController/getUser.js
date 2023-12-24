const express = require('express')
const { getUserInfo } = require('./getUserInfo')

const getUser = async (req, res) => {
    try {

        const user = await getUserInfo()
        res.send(user)

    } catch (error) {
        res.send({ error: "Server error"})

    }
}

module.exports = getUser