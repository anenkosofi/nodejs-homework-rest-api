const express = require('express');

const {
  validateUser,
  validateSubscription,
} = require('../../middlewares/validation');
const auth = require('../../middlewares/auth');
const { users: controllers } = require('../../controllers');
const { userJoiSchema, subscriptionJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validateUser(userJoiSchema), controllers.register);

router.post('/login', validateUser(userJoiSchema), controllers.login);

router.get('/current', auth, controllers.getCurrentUser);

router.post('/logout', auth, controllers.logout);

router.patch(
  '/',
  auth,
  validateSubscription(subscriptionJoiSchema),
  controllers.updateSubscription
);

module.exports = router;
