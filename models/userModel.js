const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const saltRounds = 10; //It determines the number of times the password will be hashed
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'please provide a firstname'],
  },
  lastname: {
    type: String,
    required: [true, 'please provide a lastname'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
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

// Confirm if the user trying to log in has the correct credentials
// userSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// };

module.exports = mongoose.model('User', userSchema);
