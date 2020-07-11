const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const login_route = require('./routes/auth')

const admin = require('./admin');
const apiRoute = require('./routes/api');

const cors = require('cors');
const log = require('./log');

const port = process.env.PORT || 8000;

// dont rearrange the app.use order
app.use(cors());

app.use('/admin', admin);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', login_route);
app.use('/api', apiRoute);

// IRENIC
app.use('/irenic/', express.static(path.resolve(`${__dirname}/client/irenic/build`)));
app.get('/irenic/*', (req, res) => res.sendFile(path.resolve(`${__dirname}/client/irenic/build/index.html`)));

// MAIN STATIC CIA PAGE
app.use('/', express.static(path.resolve(`${__dirname}/client/home/build`)));//STATIC FOLDER IS REACTS BUILD FOLDER
app.get('/*', (req, res) => res.sendFile(path.resolve(`${__dirname}/client/home/build/index.html`)));

app.listen(port, () => log.serverStart());
