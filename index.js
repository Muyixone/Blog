require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
const createError = require('http-errors');
const passport = require('passport');

const createBlogRoute = require('./routes/routes.Blog');
const usersRoute = require('./routes/route.User');

const connectToDb = require('./db');

const logoutController = require('./controller/controller.logout');

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static('public'));
app.use(expressFileUpload());

const port = process.env.PORT;

// === CONNECT TO DATABASE
connectToDb();

//=== INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require('./middleware/jwt')(passport);

app.use('/blog', createBlogRoute);

app.use('/users', usersRoute);

app.get('/', (req, res) => {
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

module.exports = app;
