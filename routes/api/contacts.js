const express = require('express');

const { contacts: controllers } = require('../../controllers');
const { auth, validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, controllers.getAllContacts);

router.get('/:contactId', auth, isValidId, controllers.getContactById);

router.post(
  '/',
  auth,
  validateBody(schemas.addedContactJoiSchema),
  controllers.addContact
);

router.put(
  '/:contactId',
  auth,
  isValidId,
  validateBody(schemas.updatedContactJoiSchema),
  controllers.updateContact
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validateBody(schemas.statusJoiSchema),
  controllers.updateStatus
);

router.delete('/:contactId', auth, isValidId, controllers.deleteContact);

module.exports = router;
