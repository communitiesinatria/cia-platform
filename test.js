const dbtest = require('./tests/db');

(async () => {

    await dbtest();


    process.exit();

})()

/* const CryptoJS = require("crypto-js");

const x = {
    key: process.env.CRPYT_KEY,
    encrypt: function (txt) {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    },
    decrypt: function (txt) {
        return CryptoJS.AES.decrypt(txt, this.key).toString(CryptoJS.enc.Utf8);
    },
}
 */