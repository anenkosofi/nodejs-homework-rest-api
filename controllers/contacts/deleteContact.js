const { Contact } = require('../../models');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const removedContact = await Contact.findByIdAndRemove({
      owner: _id,
      _id: contactId,
    });
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
