const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

  verifyToken: ({ token }) => {
    const secret = process.env.ACCESS_TOKEN_KEY || process.env.CRPYT_KEY;

    return new Promise((res, rej) => {

      jwt.verify(token, secret, (err, decoded) => {
        if (err) rej(err);
        res(decoded);
      })

    })
  },
  signAccessToken: ({ _id }) => {

    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_KEY || process.env.CRPYT_KEY;
      console.log(_id);
      const options = {
        expiresIn: '86400s',
        issuer: 'CommunitiesInAtria',
        audience: _id + '',
      }
      jwt.sign(payload, secret, options, (err, token) => {
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