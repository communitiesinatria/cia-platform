const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const apiRoute = require('./routes/api/api');

const cors = require('cors');
const log = require('./log');

const port = process.env.PORT || 8000;
!process.env.NODE_ENV && app.use(cors()); //!DO NOT REMOVE THIS LINE

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', apiRoute);

app.use(express.static(path.resolve(`${__dirname}/client/build`)));//STATIC FOLDER IS REACTS BUILD FOLDER

app.get('/*', (req, res) => res.sendFile(path.resolve(`${__dirname}/client/build/index.html`)));

app.listen(port, () => log.serverStart());