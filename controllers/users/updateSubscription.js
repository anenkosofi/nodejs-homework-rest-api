const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );
    const { _id: id, email, subscription: newSubscription } = updatedUser;
    res.json({
      status: 'success',
      code: 200,
      user: {
        id,
        email,
        newSubscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
