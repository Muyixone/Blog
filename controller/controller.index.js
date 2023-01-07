const BlogPost = require('../models/blogpost');

exports.getHomePage = async (req, res, next) => {
  const blogPosts = await BlogPost.find({});
  res.render('index', { blogPosts });
};

exports.getPostById = async (req, res, next) => {
  const id = req.params.id;
  const blogPost = await BlogPost.findById(id);
  res.render('post', { blogPost });
};
