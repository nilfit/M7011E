var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var secrets = require('./secret/secrets');

var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express();

function ensureAuthenticated(req, res, next) {
  var sess = req.session;
  if (req.session.login) {
    return next(null);
  }
  res.status(401).end();
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({ secret: secrets.sessionSecret,
                  resave: false,
                  saveUninitialized: false,
                  // TODO use a different store
                  rolling: true,
                  cookie: {
                    maxAge: 900000 // 15 minutes
                  }
                  }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/auth', auth);
app.use('/api', ensureAuthenticated, api);
var db = require('./db.js');
if (app.get('env') === 'development') {
  app.get('/test', (req, res) => {
    var sess = req.session;
    if (sess.login) {
      res.send('logged in as ' + sess.login);
    } else {
      res.send('not logged in');
    }
  });
}
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({message: res.locals.message, error: res.locals.error});
});

module.exports = app;
