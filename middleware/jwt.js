require('dotenv').config();

const UserModel = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      // Confirm that the token is valid before authenticatings
      (payload, done) => {
        UserModel.findOne({ _id: payload._id })
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch((err) => {
            return done(err, flase, { message: 'Server errors' });
          });
      }
    )
  );
};
