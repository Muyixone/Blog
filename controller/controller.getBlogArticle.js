const blogModel = require('../models/blogpost');

exports.getArticles = async (req, res, next) => {
  const article = await blogModel.find({}).sort({ datePosted: 'desc' });
  return res.status(200).json({
    statusCode: 200,
    message: 'Fetch articles successfully',
    data: { article },
  });
};

exports.getSingleArticle = async (req, res, next) => {
  const article = await blogModel
    .findOne({ id: req.params.id })
    .sort({ datePosted: 'desc' });

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetch single article successfully',
    data: {
      article: article || {},
    },
  });
};
