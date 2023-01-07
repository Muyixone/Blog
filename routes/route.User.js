const express = require('express');
const router = express.Router();

const newUserController = require('../controller/controller.newUser');
const loginController = require('../controller/controller.login');
const storeUsersController = require('.././controller/controller.storeUser');
const userLoginController = require('../controller/controller.loginUser');
const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

/*
 * Get the register user page
 * auth/register
 */
router.get('/auth/register', redirectIfAuthMiddleware, newUserController);

//auth/login
router.get('/auth/login', redirectIfAuthMiddleware, loginController);

//users/login
router.post('/users/register', redirectIfAuthMiddleware, storeUsersController);

/*
 * post /users/login
 */
router.post('/users/login', redirectIfAuthMiddleware, userLoginController);

module.exports = router;
