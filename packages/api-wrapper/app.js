// native
const path = require('path');
// npm
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const pino = require('express-pino-logger')
// local
const results = require('./routes/results');
const details = require('./routes/details');

const api = express();

api.use(helmet());
api.use(pino());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(cookieParser());
api.use(express.static(path.join(__dirname, 'public')));

api.get('/favicon.ico', function(req, res) {
    res.status(204);
});

// define routes
api.use('/api', results);
api.use('/api', details);

// catch 404 and forward to error handler
api.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
api.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = api;
