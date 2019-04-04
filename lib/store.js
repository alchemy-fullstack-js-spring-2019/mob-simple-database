const uuid = require('uuid/v4');

class Store {
    constructor(rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    create(objectToSave, callback) {
        const randomId = uuid();
        const objectThatSaved = {...objectToSave, } 
        //fs.write
        //callback(err, obj)
    }



}
//testStore.create(objectToSave, callback(error, objectThatSaved));
module.exports = Store;
