const userModel = require('../models/userModel');
const path = require('path');

const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  // Check if the user with the given email exists
  const alreadyExists = await userModel
    .findOne({ email: email })
    .catch((err) => {
      console.log('Error:', err);
    });
  if (alreadyExists) {
    return res.status(400).json({
      error: 'Email already exists',
    });
  }

  userModel.create({ firstname, lastname, email, password }, (err, user) => {
    if (err) {
      res.json({ error: err });
      // return res.redirect('/auth/register');
    }
    res.json({ message: 'User created', user });
    // return res.status(200).redirect('/');
  });
};

// module.exports = (req, res, next) => {
//   let userDetails = req.body;
//   User.create(userDetails, (err, user) => {
//     if (err) {
//       let validationErrors = Object.keys(err.errors).map((key) => {
//         return err.errors[key].message; //Without the return key word, the error message will not be displayed
//       });
//       // req.session.validationErrors = validationErrors; //Storing the validationErrors variable in the session
//       req.flash('validationErrors', validationErrors); // storing the validationErrors in the validationErrors key
//       req.flash('data', userDetails);
//       return res.redirect('/auth/register');
//     }
//     return res.redirect('/');
//   });
// };
