const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const createError = require('http-errors');
const { getErrorData } = require('./utils/errorHandler');

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
  if (req.session.loggedIn === true) {
    res.redirect('/home');
  } else {
    res.render('landing');
  }
});

app.get('/home', checkLogin, (req, res) => {
  res.render
  ('home', { user: 'User Authenticated' });
});

// Error handler 404
app.use(function(req, res, next) {
    next(createError(404));
});

//set locals, only providing error in development
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorData = getErrorData(statusCode, 'general');
  
  // Em desenvolvimento, mostra detalhes do erro
  if (req.app.get('env') === 'development') {
    errorData.errorMessage = err.message;
    errorData.solutionMessage = `Erro técnico: ${err.message}. Stack: ${err.stack}`;
  }
  
  res.status(statusCode);
  res.render('error', errorData);
});


module.exports = app;
