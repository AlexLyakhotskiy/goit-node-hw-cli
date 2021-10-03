const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  const result = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const result = await list.find(e => e.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const newList = list.filter(e => e.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return newList;
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const id = list.length ? list[list.length - 1].id + 1 : 1;
  const newList = [...list, { id, name, email, phone }];

  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return newList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
