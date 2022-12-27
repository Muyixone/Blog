const BlogPost = require('../models/blogpost');
const path = require('path');

/*
 * GET /posts/new
 * Get's the page to create a new blog post
 */
exports.getCreatePage = (req, res, next) => {
  //check if the session contains the userid before displaying the create new post page
  if (req.session.userId) {
    return res.render('create');
  }
  res.redirect('/auth/login');
};

/*
 * POST /posts/store
 * Create's a new blog post
 */
exports.postBlog = async (req, res, next) => {
  let body = req.body;
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, '..', 'public/img', image.name),
    async (err) => {
      await BlogPost.create({
        ...body, //Used a spread operator, cos the site cratches without it
        image: '/img/' + image.name,
      });
      res.redirect('/');
    }
  );
};
