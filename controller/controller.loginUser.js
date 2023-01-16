const userModel = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ error: 'Please enter a valid email and password' });
  }
  const userWithEmail = await userModel.findOne({ email }).catch((error) => {
    return next(error);
  });
  if (!userWithEmail) {
    return res.json({ message: 'Email or password incorrect' });
  }
  bcrypt.compare(password, userWithEmail.password, (error, result) => {
    if (error) return next(error);
    if (!result) {
      return res.json({ messagae: 'Email or password incorrect' });
    }
  });
  const user = {
    id: userWithEmail._id,
    email: userWithEmail.email,
  };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1hr' });

  // Save the token to the cookie for accessibility from the browser
  res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

  res.json({
    message: `Welcome back ${userWithEmail.firstname}`,
    token: token,
  });
};

// module.exports = async (req, res, next) => {
//   passport.authenticate('login', async (err, user, info) => {
//     try {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         const error = new Error('Username or password is incorrect');
//         return next(error);
//       }

//       req.login(user, { session: false }, async (err) => {
//         if (err) {
//           return next(err);
//         }

//         // Store the id and the email in the payload of the JWT
//         const body = { _id: user._id, email: user.email };

//         // Sign the token with a secret or key (JWT_SECRET), and send back the token to the user
//         const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
//           expiresIn: '1hr',
//         });

//         return res.json({ token });
//         // res.cookie('token', token, {
//         //   httpOnly: true,})
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// };

// module.exports = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email }).then((user) => {
//     if (!user) {
//       //check if user is in the database

//       return res.status(400).redirect('/auth/login', {
//         message: 'User not found.',
//       });
//     }
//   });
// };

//
