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
    callback(null, copy);
  }
};
