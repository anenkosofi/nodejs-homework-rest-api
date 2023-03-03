const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models');

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  const {
    email: userEmail,
    subscription: userSubscription,
    avatarURL: userAvatar,
  } = newUser;
  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: userEmail,
      subscription: userSubscription,
      avatarURL: userAvatar,
    },
  });
};

module.exports = register;
