const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById({ owner: _id, _id: contactId });
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} is not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    contact,
  });
};

module.exports = getContactById;
