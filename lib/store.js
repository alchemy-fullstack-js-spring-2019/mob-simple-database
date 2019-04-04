const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  create(pets, callback) {
    const _id = uuid();
    const newObj = { ...pets, _id };
    const newFilePath = path.join(this.rootDir, `${newObj._id}.json`);
    const fileContents = JSON.stringify(newObj);
    fs.writeFile(newFilePath, fileContents, err => {
      callback(err, newObj);
    });
  }

  findById(_id, callback) {
    let objectFromFile = null;
    
    
    callback(err, objectFromFile);
    //take an id
    //find the object that has the id
    //objectFromFile is null if no id/object match
  }
}

module.exports = Store;
