const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');

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
};
