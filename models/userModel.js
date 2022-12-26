const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10; //It determines the number of times the password will be hashed
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash('user.password', saltRounds, (err, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
