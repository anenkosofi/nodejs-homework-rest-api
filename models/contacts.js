const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
};

const getContactById = async contactId => {
  const contactList = await listContacts();
  const contact = contactList.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [removedContact] = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return removedContact;
};

const addContact = async body => {
  const contactList = await listContacts();
  const lastElementId = Number(contactList[contactList.length - 1].id);
  const nextElementId = lastElementId + 1;
  const newContact = { id: nextElementId.toString(), ...body };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  contactList[index] = { ...contactList[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contactList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
