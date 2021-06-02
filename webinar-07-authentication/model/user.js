const { Schema, model } = require('mongoose');
const { Gender } = require('../helpers/constants');
const genders = Object.values(Gender);

const userSchema = new Schema(
  {
    name: { type: String, minlength: 2, default: 'Guest' },
    age: {
      type: Number,
      min: 0,
      max: 35,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: genders,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.path('name').validate(value => {
  const re = /[A-Z]\w+/g;
  return re.test(String(value));
});

const User = model('user', userSchema);

module.exports = User;
