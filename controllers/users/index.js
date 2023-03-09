const { controllerWrapper } = require('../../helpers');

const register = require('./register');
const login = require('./login');
const getCurrentUser = require('./getCurrentUser');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendEmailRequest = require('./resendEmailRequest');

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrentUser: controllerWrapper(getCurrentUser),
  logout: controllerWrapper(logout),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
  verifyEmail: controllerWrapper(verifyEmail),
  resendEmailRequest: controllerWrapper(resendEmailRequest),
};
