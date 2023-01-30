const blogModel = require('../models/blogpost');
const mongoose = require('mongoose');

exports.updateArticle = async (req, res, next) => {
  let blogId = req.params.id;

  // Check if the _id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({
      message: 'Invalid blog id',
      data: {},
    });
  }
  //Get a particular blog post from the database  with its id
  const blog = await blogModel.findById({ _id: blogId });
  if (!blog) {
    return res.status(404).json({
      message: 'No blog found',
      data: {},
    });
  }

  let currentUser = req.user;

  // Check if the original article was posted by same author
  // By checking if thier _id match
  // Note blog.author._id != currentUser._id
  // But blog.author._id == currentUser.id

  if (blog.author != currentUser.id) {
    return res.status(404).json({
      message: 'Access denied: You do not have the right to edit this article',
      data: {},
    });
  }
  try {
    const updatedArticle = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags,
          state: req.body.state,
          body: req.body.body,
        },
        new: true,
      }
    );
    return res.status(200).json({
      message: 'Article updated successfully',
      data: updatedArticle,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: err,
    });
  }
};
