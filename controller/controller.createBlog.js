const blogModel = require('../models/blogpost');

exports.createBlogPost = async (req, res, next) => {
  const { title, description, tags, author, body } = req.body;

  const blog = new blogModel({ title, description, tags, author, body });

  //save the blog post to the database
  await blog.save();
  return res.status(201).json({
    statusCode: 201,
    message: 'Post created successfully',
    data: { blog },
  });
};
