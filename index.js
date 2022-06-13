const fs = require("fs/promises");
const contacts = require('./contacts');
const { program } = require("commander");
// const yargs = require("yargs");
// const {hideBin} = require("yargs/helpers");


const invokeAction = async ({action, id, name, email, phone}) => {


    switch (action) {
        case "list":
            const data = await contacts.getContacts()
            console.table(data)
        break;

        case "get":
            const contact = await contacts.getContactById(id)
            console.table(contact)
        break;

        case "remove":
            const deletedContact = await contacts.removeContact(id)
            console.table(deletedContact)
        break;

        case "add":
            const neWcontact = await contacts.addContact(name, email, phone)
            console.table(neWcontact)
        break;

        default: console.warn('\x1B[31m Unknown action type!');
    }
};

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

    program.parse(process.argv);

    const argv = program.opts();
// program.parse();
// const options = program.opts();
// console.log(options)    

invokeAction(argv)

// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
// console.log(argv)

// invokeAction(argv)

// invokeAction({action: "list"})
// invokeAction({action: "get", id: "8"})
// invokeAction({action: "add", name: "John Doe", email: "jd.112264@gmail.com", phone: "(888) 888-8888"})
// invokeAction({action: "remove", id: "9"})