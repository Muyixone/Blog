const user = require('../models/userModel');

module.exports = (req, res, next) => {
  let userDetails = req.body;
  user.create(userDetails, (err, user) => {
    if (err) {
      return res.redirect('/auth/register');
    }
    return res.redirect('/');
  });
};
