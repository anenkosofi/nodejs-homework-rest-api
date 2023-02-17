const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
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
