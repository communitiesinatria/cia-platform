require('dotenv').config();
const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const x = {
    key: 'default',
    encrypt: async function (txt) {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    },
    decrypt: async function (txt) {
        return CryptoJS.AES.decrypt(txt, this.key).toString(CryptoJS.enc.Utf8);
    },
}

//Set up default mongoose connection
const mongoDB = process.env.CIA_DATA_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('database connected'));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    pwd: String,
    email: String,
    props: Object,
});
const TeamMemberSchema = new Schema({
    name: String,
    profile_img: String,
    contact: Object
});
const EventSchema = new Schema({
    title: String,
    desc: String,
    event_img: String,
    links: Object
});

const ProjectSchema = new Schema({
    title: String,
    desc: String,
    project_img: String,
    links: Object
});


const UserModel = mongoose.model('users', UserSchema);
const TeamMemberModel = mongoose.model('teamdata', TeamMemberSchema);
const EventModel = mongoose.model('events', EventSchema);
const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = { ProjectModel, EventModel, UserModel, TeamMemberModel, mongoose };

