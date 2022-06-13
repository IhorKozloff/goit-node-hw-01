  const fs = require("fs/promises")
  const path = require("path");


  const contactsPath = path.join(__dirname, "db","contacts.json");

  function idGenerator (data) {
    
    const allId = data.map(item => item.id);
    
    const newId = Number(allId[allId.length - 1]) + 1
 
    return newId.toString()
  }



  async function getContacts() {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts);
  }
  
  async function  getContactById (contactId) {
    const contacts = await getContacts();
    return contacts.find(item => item.id === contactId);
  }
  
  async function removeContact(contactId) {

    const contacts = await getContacts();
    const deletedContactIndex = contacts.findIndex(item => item.id === contactId)

    if (deletedContactIndex === -1) {
      return null
    }

    const [deletedContact] = contacts.splice(deletedContactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact
  }
  
  async function addContact(name, email, phone) {
    const contacts = await getContacts();
    const id = idGenerator(contacts);
    
    const newContact = {id, name, email, phone}

    contacts.push(newContact);
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact;
  }

  module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact
  }