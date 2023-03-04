const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized(
      'Email or password is wrong or you did not verify your e-mail'
    );
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  const { email: userEmail, subscription: userSubscription, avatarURL } = user;
  res.json({
    status: 'success',
    code: 200,
    token,
    user: {
      email: userEmail,
      subscription: userSubscription,
      avatarURL,
    },
  });
};

module.exports = login;
