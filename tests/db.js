require('dotenv').config();
const mongoose = require('mongoose');
module.exports = () => {
    const mongoDB = process.env.MONGO_URL;
    return new Promise((res, rej) => {
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;

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