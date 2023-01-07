const User = require('../models/userModel');

module.exports = (req, res, next) => {
  //check if the user is logged in
  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.redirect('/');
    }
    next();
  });
};
