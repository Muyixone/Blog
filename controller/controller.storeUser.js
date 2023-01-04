const User = require('../models/userModel');
const path = require('path');

module.exports = (req, res, next) => {
  let userDetails = req.body;
  User.create(userDetails, (err, user) => {
    if (err) {
      let validationErrors = Object.keys(err.errors).map((key) => {
        return err.errors[key].message; //Without the return key word, the error message will not be displayed
      });
      // req.session.validationErrors = validationErrors; //Storing the validationErrors variable in the session
      req.flash('validationErrors', validationErrors); // storing the validationErrors in the validationErrors key
      req.flash('data', userDetails);
      return res.redirect('/auth/register');
    }
    return res.redirect('/');
  });
};
