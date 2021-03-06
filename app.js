var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// ADDING MONGOOSE
var mongoose = require('mongoose');

// HOMEPAGE ROUTER
var indexRouter = require('./routes/index');

// ADMIN PANEL ROUTER
var articlesRouter = require('./routes/articles');

var usersRouter = require('./routes/users');

// SESSION
var session = require("express-session");
var sessionAuth = require("./middlewares/sessionAuth")

var app = express();

//ADDING SESSION
app.use(session({ secret: "dummytext", resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }));
app.use(sessionAuth)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HOMEPAGE ROUTER
app.use('/', indexRouter);

// ADMIN PANEL ROUTER
app.use('/articles', articlesRouter);

app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ADDING MONGOOSE
mongoose.connect("mongodb://localhost/articlescrud",
  { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log("Connected to MongoDB...."))
  .catch((error) => console.log(error.message));
module.exports = app;
