require('dotenv').config();
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = process.env.TEAM_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('database connected'));

const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
    name: String,
    profile_img: String,
    contact: Object
});



const TeamMemberModel = mongoose.model('teamdata', TeamMemberSchema);

module.exports = { TeamMemberModel, mongoose };

