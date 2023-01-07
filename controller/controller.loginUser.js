const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      //check if user is in the database

      return res.status(400).redirect('/auth/login', {
        message: 'User not found.',
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log({ message: 'an error occured' });
        return res.status(400).redirect('/auth/login');
      }
      if (result) {
        req.session.userId = user._id;
        console.log({ message: 'log in successful' });
        return res.redirect('/');
      } else {
        console.log({ message: 'log in not successful' });
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
