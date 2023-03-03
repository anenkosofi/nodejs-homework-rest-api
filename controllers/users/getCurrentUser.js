const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({
    status: 'success',
    code: 200,
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = getCurrentUser;
