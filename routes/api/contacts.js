const express = require('express');

const {
  validateAddedContact,
  validateUpdatedContact,
  validateStatusContact,
  validateContactId,
} = require('../../middlewares/validation');
const {
  addedContactJoiSchema,
  updatedContactJoiSchema,
  statusJoiSchema,
  idContactSchema,
} = require('../../models/contact');
const { contacts: controllers } = require('../../controllers');

const router = express.Router();

router.get('/', controllers.getAllContacts);

router.get(
  '/:contactId',
  validateContactId(idContactSchema),
  controllers.getContactById
);

router.post(
  '/',
  validateAddedContact(addedContactJoiSchema),
  controllers.addContact
);

router.put(
  '/:contactId',
  validateContactId(idContactSchema),
  validateUpdatedContact(updatedContactJoiSchema),
  controllers.updateContact
);

router.patch(
  '/:contactId/favorite',
  validateContactId(idContactSchema),
  validateStatusContact(statusJoiSchema),
  controllers.updateStatus
);

router.delete(
  '/:contactId',
  validateContactId(idContactSchema),
  controllers.deleteContact
);

module.exports = router;
