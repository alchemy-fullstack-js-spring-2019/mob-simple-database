const shortId = require('short-id');
const fs = require('fs');

class Store {
    constructor(rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    create(objectToSave, callback) {
        const randomId = shortId.generate();
        const objectThatSaved = { ...objectToSave, _id: randomId }; 
        //fs.write
        //callback(err, obj)
        const objectStringify = JSON.stringify(objectThatSaved);
        const path = `./data/${randomId}.json`;
        fs.writeFile(path, objectStringify, (err) => {
            if(err) throw err;
            fs.readFile(path, 'utf8', (err, data) => {
                const parsedData = JSON.parse(data);
                callback(err, parsedData);
            });
        });
    }



}

module.exports = Store;
