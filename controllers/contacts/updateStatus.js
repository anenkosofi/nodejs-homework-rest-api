const { Contact } = require('../../models');

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        favorite,
      },
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

module.exports = updateStatus;
