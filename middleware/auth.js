const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      //   jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return UserModel.findOne({ id: token._id }).then((user) => {
          return done(null, user);
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

// Save the information provided by the user to the database
// and then send the user information to the next middleware if sucessful
// otherwise, it reports an error
// passport.use(
//   'register',
//   new localStrategy(
//     {
//       firstnameField: 'firstname',
//       lastnameField: 'lastname',
//       emailField: 'email',
//       passwordField: 'password',
//     },
//     async (firstname, lastname, email, password, done) => {
//       try {
//         const user = await UserModel.create({
//           firstname,
//           lastname,
//           email,
//           password,
//         });

//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// Here, the user is authenticated based on the email and password provided
// If the user is found, it sends the user information to the next middleware
// Otherwise, it reports an error
// passport.use(
//   'login',
//   new localStrategy(
//     {
//       emailField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = UserModel.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//           // return res.redirect('/auth/login');
//         }
//         const validate = await user.isValidPassword(password);
//         if (!validate) {
//           return done(null, false, { message: 'Invalid password' });
//           // return res.redirect('/auth/login');
//         }
//         return done(null, user, { message: 'Logged in successfully' });
//         // return res.redirect('/')
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );
