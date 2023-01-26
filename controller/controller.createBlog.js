const blogModel = require('../models/blogpost');

exports.createBlogPost = async (req, res, next) => {
  const blog = new blogModel({ ...req.body, author: req.user._id });

  //save the blog post to the database
  await blog.save();
  return res.status(201).json({
    statusCode: 201,
    message: 'Post created successfully',
    data: { blog },
  });
};
