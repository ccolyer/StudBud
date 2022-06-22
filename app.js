const createError = require('http-errors');
const express = require('express');
const { engine: handlebars } = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/sign-up');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const taskBoardRouter = require('./routes/task-board');
const timeTrackerRouter = require('./routes/time-tracker');
const libraryRouter = require('./routes/library');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
  extname: '.hbs',
  layoutsDir: __dirname + '/views',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Our pages go here.
 */
app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/task-board', taskBoardRouter);
app.use('/time-tracker', timeTrackerRouter);
app.use('/library', libraryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
