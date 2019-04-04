const uuid = require('uuid/v4');
const fs = require('fs');

class Store{
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(object, callback) {
    const id = uuid();
    let modifyObject = { ...object };
    modifyObject._id = id;
    const json = JSON.stringify(modifyObject);
    fs.writeFile(`${this.rootDir}/${id}.json`, json, 'utf8', err => {
      callback(err, modifyObject);
    });
  }

  findById(id, callback) {
    fs.readFile(`${this.rootDir}/${id}.json`, 'utf8', (err, animalJsonObject) => {
      callback(err, animalJsonObject);
    });
  }
}

module.exports = Store;
