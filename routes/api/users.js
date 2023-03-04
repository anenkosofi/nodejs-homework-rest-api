const express = require('express');

const { users: controllers } = require('../../controllers');
const { auth, validateBody, uploadFile } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.userJoiSchema),
  controllers.register
);

router.post('/login', validateBody(schemas.userJoiSchema), controllers.login);

router.get('/current', auth, controllers.getCurrentUser);

router.post('/logout', auth, controllers.logout);

router.patch(
  '/',
  auth,
  validateBody(schemas.subscriptionJoiSchema),
  controllers.updateSubscription
);

router.patch(
  '/avatars',
  auth,
  uploadFile.single('avatar'),
  controllers.updateAvatar
);

router.get('/verify/:verificationToken', controllers.verifyEmail);

router.post(
  '/verify',
  validateBody(schemas.emailVerificationJoiSchema),
  controllers.resendEmailRequest
);

module.exports = router;
