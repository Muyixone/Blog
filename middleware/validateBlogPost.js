const joi = require('joi');

const validateBlogPostMiddleware = async (req, res, next) => {
  const BlogpostPayload = req.body;

  try {
    await blogValidator.validateAsync(BlogpostPayload);
    next();
  } catch (error) {
    console.log(error.details[0].message);
    return res.status(406).send(error.details[0].context.key);
  }
};

const blogValidator = joi.object({
  title: joi.string().min(5).max(255).required(),
  body: joi.string().min(10).required(),
  firstname: joi.string().alphanum().min(3),
  lastname: joi.string().alphanum().min(3),
  datePosted: joi.date().default(Date.now()),
  image: joi.string(),
});

module.exports = validateBlogPostMiddleware;
