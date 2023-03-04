const nanoid = require('nanoid');
const gravatar = require('gravatar');

const { Conflict } = require('http-errors');
const { sendEmail } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: 'E-mail verification',
    html: `<a href="http://localhost:8080/api/users/verify/${verificationToken}" target="_blank">Click to verify your e-mail address</a>`,
  };
  await sendEmail(mail);
  const {
    email: userEmail,
    subscription: userSubscription,
    avatarURL: userAvatar,
    verificationToken: userVerificationToken,
  } = newUser;
  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: userEmail,
      subscription: userSubscription,
      avatarURL: userAvatar,
      verificationToken: userVerificationToken,
    },
  });
};

module.exports = register;
