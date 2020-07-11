const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

  signAccessToken: ({ _id }) => {

    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_KEY;
      console.log(_id);
      const options = {
        expiresIn: '30s',
        issuer: 'CommunitiesInAtria',
        audience: _id + '',
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