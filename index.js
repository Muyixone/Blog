const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
const createError = require('http-errors');
const passport = require('passport');
require('dotenv').config();

const createBlogRoute = require('./routes/routes.Blog');
const usersRoute = require('./routes/route.User');
const validateMiddleware = require('./middleware/validateMiddleware');

//require('./middleware/auth');

const logoutController = require('./controller/controller.logout');

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static('public'));
app.use(expressFileUpload());
//app.use('/posts/store', validateMiddleware);
// app.use(
//   expressSession({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
//flash middleware helps flush away error notifications at the end of every request live-
//cyle, whenever the user re-visits the form after a successful submission
//app.use(flash());

//app.set('view engine', 'ejs');

//Global middleware
//checks if a user is logged in to determine what to render in the nav bar
//if user is logged in then display the logout and create blog buttons in the nav bar
//else display the login and create new user buttons
// global.loggedIn = null;
// app.use('*', (req, res, next) => {
//   loggedIn = req.session.userId;

//   next();
// });

const port = 3333;

app.use('/blog', createBlogRoute);

app.use('/users', usersRoute);

app.get('/', (req, res, next) => {
  res.status(200).json({ message: "Welcome to Learners' Blog" });
});

app.get('/auth/logout', logoutController);

//Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
  //set locals, only providing error in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') == 'development' ? err : {};

  //render the error page
  res.status(err.status || 404);
  res.json({
    statsCode: 404,
    message: 'Page not found',
  });
});

app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });

module.exports = app;
