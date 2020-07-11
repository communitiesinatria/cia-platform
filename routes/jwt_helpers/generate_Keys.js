const crypto = require('crypto')

console.time();
const key1 = crypto.randomBytes(32).toString('hex')

const key2 = crypto.randomBytes(32).toString('hex')
console.timeEnd();

console.table({ key1, key2 })