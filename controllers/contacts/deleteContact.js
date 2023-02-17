const { Contact } = require('../../models');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      return next();
    }
    res.json({
      status: 'success',
      code: 200,
      contact: removedContact,
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
