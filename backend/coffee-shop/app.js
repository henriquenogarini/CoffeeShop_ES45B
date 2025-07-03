const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const createError = require('http-errors');

const authRouter = require('./routes/auth');

const app = express();

// Set up Handlebars view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000*5 } // 5 minutes
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);

// Middleware to check if user is logged in
function checkLogin(req, res, next) {
  if (req.session.loggedIn === true) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.get('/home', checkLogin, (req, res) => {
  res.render('home', { user: 'User Authenticated' });
});

// Error handler 404
app.use(function(req, res, next) {
    next(createError(404));
});

//set locals, only providing error in development
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
