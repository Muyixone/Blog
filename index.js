const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
const createError = require('http-errors');
require('dotenv').config();

const createBlogRoute = require('./routes/routes.Blog');
const usersRoute = require('./routes/route.User');
const validateMiddleware = require('./middleware/validateMiddleware');

const logoutController = require('./controller/controller.logout');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressFileUpload());
app.use('/posts/store', validateMiddleware);
app.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: true,
  })
);
//flash middleware helps flush away error notifications at the end of every request live-
//cyle, whenever the user re-visits the forma after a successful submission
app.use(flash());

app.set('view engine', 'ejs');

//Global middleware
//checks if a user is logged in to determine what to render in the nav bar
//if user is logged in then display the logout and create blog buttons in the nav bar
//else display the login and create new user buttons
global.loggedIn = null;
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;

  next();
});

const port = 3333;

app.use(createBlogRoute);
app.use(usersRoute);

// app.use(createBlogRoute);
// app.use('/about', createBlogRoute);
// //display about page here
// app.use('/post', createBlogRoute);
// app.use('/posts', createBlogRoute);
// app.use('/auth', usersRoute);

// app.use('/users', usersRoute);

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
  res.status(err.status || 500);
  res.render('notfound');
});

app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });

module.exports = app;
