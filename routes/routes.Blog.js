const express = require('express');
const router = express.Router();

require('dotenv').config();

const createBlog = require('../controller/controller.createBlog');
const getBlog = require('../controller/controller.getBlogArticle');
const updateBlog = require('../controller/controller.updateBlog');
const deleteBlog = require('../controller/controller.deleteBlog');
const authenticateMW = require('../middleware/authenticateMw');

/*
 * GET /blog
 * Get's all articles posted from the database
 */
router.get('/', getBlog.getArticles);

/*
 * GET /blog/:blogId
 * Get's all posts from the database with the given blog
 */
router.get('/:id', getBlog.getSingleArticle);

/*
 * PUT /blog/:blogId
 * Edits a given blog article
 * Protected route
 */
router.put('/:id', authenticateMW, updateBlog.updateArticle);

/*
 * POST /blog/create
 * Creates a new blog article
 */
router.post('/create', createBlog.createBlogPost);

/*
 * DELETE /blog/create
 * Deletes a given blog post
 */
router.delete('/:id', deleteBlog.deleteArticle);

module.exports = router;
