const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: String,
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const emailVerificationJoiSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  userJoiSchema,
  subscriptionJoiSchema,
  emailVerificationJoiSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
