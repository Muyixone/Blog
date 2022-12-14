const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const saltRounds = 10; //It determines the number of times the password will be hashed
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    unique: true,
    required: [true, 'please provide a firstname'],
  },
  lastname: {
    type: String,
    unique: true,
    required: [true, 'please provide a lastname'],
  },
  email: { type: String, required: true },
  password: { type: String, required: [true, 'please provide a password'] },
});

userSchema.plugin(uniqueValidator);
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
