const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    signAccessToken: (email) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = process.env.ACCESS_TOKEN_KEY
          const options = {
            expiresIn: '30s',
            issuer: 'CommunitiesInAtria',
            audience: email,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(createError.InternalServerError())
              return
            }
            resolve(token)
          })
        })
      }

}