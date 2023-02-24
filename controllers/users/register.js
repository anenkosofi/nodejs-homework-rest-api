const { Conflict } = require('http-errors');

const { User } = require('../../models');

const register = async (req, res, next) => {
  try {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);
    newUser.save();
    const { email: userEmail, subscription: userSubscription } = newUser;
    res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: userEmail,
        subscription: userSubscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
