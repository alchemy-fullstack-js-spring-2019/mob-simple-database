const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');
const options = { encoding: 'utf8' };

module.exports = class Store {
  constructor(rootDirectory) {
    this.rootDirectory = rootDirectory;
  }
  create(object, callback) {
    const id = uuid();
    const copy = { ...object, _id: id };
    const filePath = path.join(this.rootDirectory, id);
    fs.writeFile(filePath, JSON.stringify(copy), err => {
      if(err) return callback(err);
      callback(null, copy);
    });
  }
  findById(id, callback) {
    const filePath = path.join(this.rootDirectory, id);
    fs.readFile(filePath, options, (err, data) => {
      if(err) return callback(err, null);
      callback(null, JSON.parse(data));
    });
  }
};
