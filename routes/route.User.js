const express = require('express');
const router = express.Router();
const passport = require('passport');

const newUserController = require('../controller/controller.newUser');
const storeUsersController = require('.././controller/controller.storeUser');
const userLoginController = require('../controller/controller.loginUser');
//const redirectIfAuthMiddleware = require('../middleware/redirectIfAuthMiddleware');

/*
 * Get the register user page
 * auth/register
 */
router.get('/auth/register', newUserController);

//users/login
router.post('/register', storeUsersController);

/*
 * post /users/login
 */
router.post('/login', userLoginController);

module.exports = router;
