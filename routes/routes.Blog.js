const express = require('express');
const router = express.Router();

const indexController = require('../controller/controller.index');
const aboutController = require('../controller/controller.about');
const newPostController = require('../controller/controller.newPost');
const authenticationMiddleware = require('../middleware/authMiddleware');
const validateBlogpostMiddleware = require('../middleware/validateBlogPost');
const createBlog = require('../controller/controller.createBlog');

/*
 * Get's the index page
 */

router.get('/:id', indexController.getPostById);

router.post('/create', createBlog.createBlogPost);

module.exports = router;

// /*
//  * GET / the home page
//  * GET  all posts from the database
//  */
// router.get('/', indexController.getHomePage);

// /*
//  * GET /posts/new
//  * Get's the page to create a new blog post
//  * // used the dot notation to call the newpost controller cos of the method of export used in the controller folder
//  */
// router.get(
//   '/posts/new',
//   //input an authentication middleware here,
//   newPostController.getCreatePage
// );

// /*
//  * POST /posts/store
//  * Create's a new blog post
//  */
// router.post(
//   '/posts/store',
//   authenticationMiddleware,
//   validateBlogpostMiddleware,
//   newPostController.postBlog
// );

// /*
//  * GET /post/:id
//  * GET  single blog post byits id
//  */

// router.get('/post/:id', indexController.getPostById);

// /*
//  * GET /about page
//  *
//  */
// router.get('/about', aboutController);
