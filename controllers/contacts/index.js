const { controllerWrapper } = require('../../helpers');

const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const deleteContact = require('./deleteContact');
const updateStatus = require('./updateStatus');

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  deleteContact: controllerWrapper(deleteContact),
  updateStatus: controllerWrapper(updateStatus),
};
