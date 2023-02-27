const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseErrorHandler } = require('../helpers');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post('save', mongooseErrorHandler);

const addedContactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updatedContactJoiSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addedContactJoiSchema,
  updatedContactJoiSchema,
  statusJoiSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
