const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
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
