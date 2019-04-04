const shortId = require('short-id');
const fs = require('fs');

class Store {
    constructor(rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    create(objectToSave, callback) {
        const randomId = shortId.generate();
        const objectThatSaved = { ...objectToSave, _id: randomId }; 
        const objectStringify = JSON.stringify(objectThatSaved);
        const path = `${this.rootDirectory}/${randomId}.json`;
        fs.writeFile(path, objectStringify, (err) => {
            if(err) throw err;
            fs.readFile(path, 'utf8', (err, data) => {
                const parsedData = JSON.parse(data);
                callback(err, parsedData);
            });
        });
    }

    findById(id, callback) {
        fs.readFile(`${this.rootDirectory}/${id}.json`, 'utf8', (err, data) => {
            let parsedData = null;
            if(!err) {
                parsedData = JSON.parse(data);
            }
            callback(err, parsedData);
        });
        
    }

    findByIdAndDelete(id, callback) {
        fs.unlink(`${this.rootDirectory}/${id}.json`, (err) => {
            let deletedMessage = { deleted: 0 };
            if(!err) {
                deletedMessage = { deleted: 1 };
            }
            callback(err, deletedMessage);
        });
    }

    find(callback) {
        //read directory
        fs.readdir(this.rootDirectory, (err, arrayOfFiles) => {
            let animalsArray = [];
            if(err) throw err;
            arrayOfFiles.forEach(id => {
                this.findById(id.slice('.'), (err, obj) => {
                    animalsArray.push(obj);
                });
                callback(err, animalsArray);
            });
        });

        //for each through files
        //findById file
        //add to array
    }


}

module.exports = Store;
