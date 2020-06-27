require('dotenv').config();
const mongoose = require('mongoose');
module.exports = () => {
    const ciamedia = process.env.CIA_MEDIA_DB;
    return new Promise((res, rej) => {
        mongoose.connect(ciamedia, { useNewUrlParser: true, useUnifiedTopology: true });
        const cia_media_connection = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', (e) => {  
            console.log('DB connection failed',e);
            rej(1);
        });
        db.on('connected', () => {
            
            console.log('DB connection successfull');
            res(0);
        });

    });
}