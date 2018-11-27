const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./api/config/database');

//Connect to Mongo Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => console.log('Connect to Mongo Database'));

//On Error
mongoose.connection.on('error', error => console.log('Database error:' + error));

//Config
const auth = require('./api/routes/auth.route');
const users = require('./api/routes/users.route');
const APP = express();
const PORT = 3000;

//Cors middleware
APP.use(cors());

//Static folder config
APP.use(express.static('public'));

//Using validator middleware
var validatorOptions = {
};

APP.use(expressValidator(validatorOptions));

//Body parser middleware for parser request
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
APP.use('/auth', auth);
APP.use('/users', users);

//Passport middleware
APP.use(passport.initialize());
APP.use(passport.session());
require('./api/config/passport')(passport);

//Index route
APP.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

//Start server listenning request
APP.listen(PORT, () => console.log(`Server started at port ${PORT}`));
