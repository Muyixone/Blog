const express = require('express');
const router = express.Router();
const passport = require('passport');

const newUserController = require('../controller/controller.newUser');
const loginController = require('../controller/controller.login');
const storeUsersController = require('.././controller/controller.storeUser');
const userLoginController = require('../controller/controller.loginUser');
//const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

/*
 * Get the register user page
 * auth/register
 */
router.get('/auth/register', newUserController);
// router.get('/auth/register', redirectIfAuthMiddleware, newUserController);

//auth/login get login page
router.get('/auth/login', loginController);
// router.get('/auth/login', redirectIfAuthMiddleware, loginController);

//users/login
router.post('/register', storeUsersController);

/*
 * post /users/login
 */
router.post('/login', userLoginController);

module.exports = router;
