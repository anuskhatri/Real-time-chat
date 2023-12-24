const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET_KEY
const verifytokentest = (req, res, next) => {

  const token = req.headers['authorization']

  if (typeof token !== "undefined") {
    const response = verifyrece_token(token)
    if (response == "not valid") {
      return res.send("not valid")
    }
    else {
      return next()
    }
  }
  else {
    res.send('auth')
  }
}
const verifyReceToken = (token) => {
  return jwt.verify(token, secret,
    (err, decoded)=> {
      if (err) {
        console.log(err)
        return {error:"not valid"}
      }
      else {
        const userId = decoded.userid
        return {userId:userId}
      }
    })
}

module.exports = {verifyReceToken,verifytokentest}