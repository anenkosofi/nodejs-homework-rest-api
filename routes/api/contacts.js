const express = require('express');
const Joi = require('joi');

const addedContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updatedContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
});

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return next();
    }
    res.json({
      status: 'success',
      code: 200,
      contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addedContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      contact: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await removeContact(contactId);
    if (!removedContact) {
      return next();
    }
    res.json({
      status: 'success',
      code: 200,
      contact: removedContact,
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error, value } = updatedContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    if (!Object.keys(value).length) {
      const error = new Error('Missing fields');
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return next();
    }
    res.json({
      status: 'success',
      code: 200,
      contact: updatedContact,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
