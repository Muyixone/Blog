const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (!user) {
      //check if user is in the database
      return res.status(400).redirect('/auth/login');
    }
    bcrypt.compare(password, user.password, (err, result) => {
      console.log(password, user.password);
      if (err) {
        return res.status(400).redirect('/auth/login');
      }
      if (result) {
        req.session.userId = user._id;
        return res.status(200).redirect('/');
      } else {
        return res.status(401).redirect('/auth/login');
      }
    });
  });
  //   if (user) {
  //     bcrypt.compare(password, user.password, (err, same) => {
  //       if (same) {
  //         console.log('success', { password: user.password });
  //         return res.redirect('/');
  //       } else {
  //         console.log('failed', { password: user.password });
  //         return res.redirect('/auth/login');
  //       }
  //     });
  //   } else {
  //     console.log('something went wrong');
  //     return res.redirect('/auth/login');
  //   }
  // });
};
