const { Contact } = require('../../models');

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      {
        owner: _id,
        _id: contactId,
      },
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
