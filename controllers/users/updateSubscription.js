const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  const {
    _id: id,
    email,
    subscription: newSubscription,
    avatarURL,
  } = updatedUser;
  res.json({
    status: 'success',
    code: 200,
    user: {
      id,
      email,
      newSubscription,
      avatarURL,
    },
  });
};

module.exports = updateSubscription;
