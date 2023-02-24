const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const updatedContact = await Contact.findByIdAndUpdate(
      {
        owner: _id,
        _id: contactId,
      },
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return next();
    }
    res.json({
      status: 'success',
      code: 200,
      contact: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
