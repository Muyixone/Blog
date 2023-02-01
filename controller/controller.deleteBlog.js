const { default: mongoose } = require('mongoose');
const blogModel = require('../models/blogpost');

exports.deleteArticle = async (req, res, next) => {
  const articleId = req.params.id;

  // Check if the id passed is valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return res.status(400).json({
      message: 'Invalid blog id',
      data: {},
    });
  }

  const article = await blogModel.findById(articleId);
  if (!article) {
    return res.status(404).json({
      message: 'Article not found',
    });
  }

  let currentUser = req.user;

  if (currentUser.id != article.author) {
    return res.status(404).json({
      message: 'Access Denied, you do not have access to delete this post',
    });
  }

  try {
    const articleToDelete = await blogModel.deleteMany({ _id: articleId });
    res.status(200).json({
      statusCode: 200,
      message:
        articleToDelete.deletedCount == 1
          ? `Deleted ${articleToDelete.deletedCount} post`
          : `Deleted ${articleToDelete.deletedCount} posts`,
      data: {},
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
