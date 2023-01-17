const blogModel = require('../models/blogpost');

exports.updateArticle = async (req, res, next) => {
  const { title, description, tags, body } = req.body;
  const articleId = req.params.id;
  const article = await blogModel.findByIdAndUpdate(
    { _id: articleId },
    {
      title,
      description,
      tags,
      body,
    }
  );
  res.status(200).json({
    statusCode: 200,
    message: 'Article successfully updated',
    data: {},
  });
};
