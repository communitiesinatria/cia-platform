require('dotenv').config();
const mongoose = require('mongoose');
const roles = require('../../roles.json')

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
    name: { type: String, default: 'Noob' },
    username: { type: String, required: true },
    email: { type: String, required: true },
    profile_img: String,
    bio: String,
    github: String,
    instagram: String,
    password: { type: String, required: true },
    props: {
        state: '',
        type: Object, default: {
            joined_on: Date.now()
        }
    },
    role: { type: String, default: roles.NOOB }
});

UserSchema.pre('save', async function () {
    this.name = this.username;
    console.log(this);
});

const EventSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    event_img: String,
    date: { type: Date, required: true },
    register: { type: String, required: true },
    other_links: [String]
});
const ProjectSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    project_img: String,
    join: { type: String, required: true },
    other_links: [String]
});

const TokenSchema = new Schema({
    token: String
});

const UserModel = mongoose.model('users', UserSchema);
const EventModel = mongoose.model('events', EventSchema);
const ProjectModel = mongoose.model('projects', ProjectSchema);
const TokenModel = mongoose.model('tokens', TokenSchema);

module.exports = { ProjectModel, EventModel, UserModel, TokenModel, mongoose };