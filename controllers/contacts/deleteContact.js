const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const removedContact = await Contact.findByIdAndRemove({
    owner: _id,
    _id: contactId,
  });
  if (!removedContact) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    contact: removedContact,
    message: 'Contact deleted',
  });
};

module.exports = deleteContact;
