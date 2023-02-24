const express = require('express');

const {
  validateAddedContact,
  validateUpdatedContact,
  validateStatusContact,
  validateContactId,
} = require('../../middlewares/validation');
const auth = require('../../middlewares/auth');
const {
  addedContactJoiSchema,
  updatedContactJoiSchema,
  statusJoiSchema,
  idContactSchema,
} = require('../../models/contact');
const { contacts: controllers } = require('../../controllers');

const router = express.Router();

router.get('/', auth, controllers.getAllContacts);

router.get(
  '/:contactId',
  auth,
  validateContactId(idContactSchema),
  controllers.getContactById
);

router.post(
  '/',
  auth,
  validateAddedContact(addedContactJoiSchema),
  controllers.addContact
);

router.put(
  '/:contactId',
  auth,
  validateContactId(idContactSchema),
  validateUpdatedContact(updatedContactJoiSchema),
  controllers.updateContact
);

router.patch(
  '/:contactId/favorite',
  auth,
  validateContactId(idContactSchema),
  validateStatusContact(statusJoiSchema),
  controllers.updateStatus
);

router.delete(
  '/:contactId',
  auth,
  validateContactId(idContactSchema),
  controllers.deleteContact
);

module.exports = router;
