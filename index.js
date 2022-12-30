const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const expressSession = require('express-session');
require('dotenv').config();

const newPostController = require('./controller/controller.newPost');
const indexController = require('./controller/controller.index');
const contactController = require('./controller/controller.contact');
const aboutController = require('./controller/controller.about');
const newUSerController = require('./controller/controller.newUSer');
const storeUsersController = require('./controller/controller.storeUser');
const loginController = require('./controller/controller.login');
const userLoginController = require('./controller/controller.loginUser');
const validateMiddleware = require('./middleware/validateMiddleware');
const authenticationMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthMiddleware');
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
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');

const port = 3333;

app.get('/', indexController.getHomePage); // used the dot notation to call the about controller cos of the method of export used in the controller folder
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/post/:id', indexController.getPostById);
app.get(
  '/posts/new',
  authenticationMiddleware,
  newPostController.getCreatePage
);
app.post('/posts/store', authenticationMiddleware, newPostController.postBlog);
app.get('/auth/register', redirectIfAuthMiddleware, newUSerController);
app.get('/auth/login', redirectIfAuthMiddleware, loginController);
app.post('/users/register', redirectIfAuthMiddleware, storeUsersController);
app.post('/users/login', redirectIfAuthMiddleware, userLoginController);
app.get('/auth/logout', logoutController);
app.use((req, res, next) => {
  res.render('notfound');
});

//Global middleware
//checks if a user is logged to determine what to render in the nav bar
global.loggedIn = null;

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;

  next();
});

app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
