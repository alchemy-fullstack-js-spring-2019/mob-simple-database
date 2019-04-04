const uuid = require('uuid/v4');
const fs = require('fs');

class Store {
    constructor(rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    create(objectToSave, callback) {
        const randomId = uuid();
        const objectThatSaved = { ...objectToSave, _id: randomId }; 
        //fs.write
        //callback(err, obj)
    }



}
//testStore.create(objectToSave, callback(error, objectThatSaved));
module.exports = Store;
