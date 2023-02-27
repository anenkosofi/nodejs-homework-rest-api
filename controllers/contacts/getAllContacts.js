const { Contact } = require('../../models');

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite, name, email } = req.query;
  const query = {
    owner: _id,
  };
  if (favorite) {
    query.favorite = favorite;
  }
  if (name) {
    query.name = name;
  }
  if (email) {
    query.email = email;
  }
  const contacts = await Contact.find(query, '', {
    skip: (page - 1) * limit,
    limit: Number(limit),
  }).populate('owner', '_id email subscription');
  res.json({
    status: 'success',
    code: 200,
    contacts,
  });
};

module.exports = getAllContacts;
