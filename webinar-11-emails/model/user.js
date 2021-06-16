const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { Gender } = require('../helpers/constants');

const SALT_FACTOR = 8;
const genders = Object.values(Gender);

const userSchema = new Schema(
  {
    name: { type: String, minlength: 2, default: 'Guest' },
    age: {
      type: Number,
      min: 0,
      max: 35
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLocaleLowerCase());
      }
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      }
    },
    idCloudAvatar: {
      type: String,
      default: null
    },
    gender: {
      type: String,
      enum: genders,
      default: Gender.NONE
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
