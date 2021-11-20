const mongoose = require('./mongodb');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'A user must have a username!'],
      unique: [true, 'Username must be unique!'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an E-mail!'],
      unique: [true, 'Email must be unique!'],
      validate: {
        validator: function (val) {
          return validator.isEmail(val);
        },
        message: 'Please enter a valid email!',
      },
    },
    password: {
      type: String,
      required: [true, 'A user must have an password!'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A user must have an password confirm!'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordChangeDate: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
userScheme.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userScheme.pre('save', async function (next) {
  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Users = mongoose.model('Users', userScheme);
module.exports = Users;
