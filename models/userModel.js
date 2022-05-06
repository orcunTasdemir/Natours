const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8, //we are just implementing the length rule since all other rules are proved to be not very effective
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on save because validate only works when you create the object or when you save them
      validator: function (el) {
        return el === this.password; //validation for the password
      },
      message: 'Password and the confirmation do not match',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // we only run this function if the password is actually modified
  if (!this.isModified('password')) {
    return next();
  }
  // here we are using a very popular hashing algorithm bcrypt to encrypt the passwords
  // how cpu intensive the operation is: we used to use 10, now we use 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field since we no longer need it
  this.passwordConfirm = undefined;
  next();
});

// we need to pass the user password as well since the password is not included in the data anymore
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  // if this property even exists, then we start checking for that user
  if (this.passwordChanged) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // return false by defaults
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
