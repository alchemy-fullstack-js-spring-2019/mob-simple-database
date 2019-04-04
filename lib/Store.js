const uuid = require('uuid/v4');
const fs = require('fs');

class Store{
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(object, callback) {
    const _id = uuid();
    let modifyObject = { ...object, _id };
    const json = JSON.stringify(modifyObject);
    fs.writeFile(`${this.rootDir}/${_id}.json`, json, 'utf8', err => {
      callback(err, modifyObject);
    });
  }

  findById(id, callback) {
    fs.readFile(`${this.rootDir}/${id}.json`, 'utf8', (err, animalJsonObject) => {
      if(err) return callback(err, null);
      callback(err, JSON.parse(animalJsonObject));
    });
  }

  deleteById(id, callback) {
    fs.unlink(`${this.rootDir}/${id}.json`, err => {
      if(err) return callback(err, { deleted: 0 });
      callback(null, { deleted: 1 });
    });
  }
}

module.exports = Store;
