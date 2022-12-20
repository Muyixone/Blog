const BlogPost = require('../models/blogpost');

/*
 * GET / the home page
 * GET  all posts from the database
 */
exports.getHomePage = async (req, res, next) => {
  const blogPosts = await BlogPost.find({});
  res.render('index', { blogPosts });
};

/*
 * GET /post/:id
 * GET  single blog post byits id
 */
exports.getPostById = async (req, res, next) => {
  const id = req.params.id;
  const blogPost = await BlogPost.findById(id);
  res.render('post', { blogPost });
};
