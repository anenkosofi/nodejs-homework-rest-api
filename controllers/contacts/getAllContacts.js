const { Contact } = require('../../models');

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const contacts = req.query.favorite
      ? await Contact.find({ owner: _id, favorite }, '', {
          skip: (page - 1) * limit,
          limit: Number(limit),
        }).populate('owner', '_id email subscription')
      : await Contact.find({ owner: _id }, '', {
          skip: (page - 1) * limit,
          limit: Number(limit),
        }).populate('owner', '_id email subscription');

    // const contacts = await Contact.find({ owner: _id, favorite}, '', {
    //   skip: (page - 1) * limit,
    //   limit: Number(limit),
    // }).populate('owner', '_id email subscription');
    res.json({
      status: 'success',
      code: 200,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
