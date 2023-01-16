const blogModel = require('../models/blogpost');

exports.deleteArticle = async (req, res, next) => {
  const articleId = req.params.id;
  const article = await blogModel.deleteOne({ _id: articleId });
  res.status(200).json({
    statusCode: 200,
    message: `Deleted ${article.deletedCount} post(s)`,
    data: {},
  });
};
