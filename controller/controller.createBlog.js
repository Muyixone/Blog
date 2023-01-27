const blogModel = require('../models/blogpost');

exports.createBlogPost = async (req, res, next) => {
  //Calculate the reading time of the blog post
  let { body } = req.body;
  const wordsPerMinute = 200;
  //Eliminate whitespace
  const noOfWords = body.split(/\s+/).length;
  const minutes = noOfWords / wordsPerMinute;
  const estimatedReadTime = Math.ceil(minutes);
  const readTime =
    estimatedReadTime > 1
      ? `${estimatedReadTime} minutes read`
      : `${estimatedReadTime} minute read`;

  const blog = new blogModel({
    ...req.body,
    reading_time: readTime,
    author: req.user._id,
  });

  //save the blog post to the database
  await blog.save();
  return res.status(201).json({
    statusCode: 201,
    message: 'Post created successfully',
    data: { blog },
  });
};
