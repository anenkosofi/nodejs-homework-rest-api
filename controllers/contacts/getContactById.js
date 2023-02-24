const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const contact = await Contact.findById({ owner: _id, _id: contactId });
    if (!contact) {
      return next();
    }
    res.json({
      status: 'success',
      code: 200,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
