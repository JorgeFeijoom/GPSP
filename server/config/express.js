'use strict';

const path = require('path');
const express = require('express');
const session = require('express-session');
const expressJwt = require('express-jwt');
const uuid = require('uuid/v4');
const HttpError = require('http-errors');
const logger = require('morgan');
const reload = require('reload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport')

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
var tmpDir = '../../tmp/';

if (config.frontend === 'react'){
  distDir ='../../node_modules/material-dashboard-react/dist'
 }else{
  distDir ='../../dist/' ;
 }

 reload(app);

//
app.use(express.static(path.join(__dirname, distDir)));
app.use(express.static(path.join(__dirname, tmpDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'mean-2019-13022019012405',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router
app.use('/api/', expressJwt({
  secret: config.jwtSecret,
  credentialsRequired: false
}), routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new HttpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join('; ');
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
