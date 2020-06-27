require('dotenv').config();
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = process.env.CIA_MEDIA_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('database connected'));

const Schema = mongoose.Schema;

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


const EventSchema = mongoose.model('events', EventSchema);
const ProjectSchema = mongoose.model('projects', ProjectSchema);

module.exports = { ProjectSchema, EventSchema, mongoose };

