const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const updateContact = async (req, res) => {
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
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    contact: updatedContact,
  });
};

module.exports = updateContact;
