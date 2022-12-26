const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      });
    } else {
      res.redirect('/auth/login');
    }
  });
};
