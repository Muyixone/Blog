const userModel = require('../models/userModel');
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
  const payload = {
    _id: userWithEmail._id,
    email: userWithEmail.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Save the token to the cookie for accessibility from the browser
  //res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
  res.json({
    message: `Welcome back ${userWithEmail.firstname}`,
    token: token,
  });
};
