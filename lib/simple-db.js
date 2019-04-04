const fs = require('fs');
const uuid = require('uuid/v4');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    // create a uuid
    const _id = uuid();
    const createdObj = { ...obj, _id };
    // fs.writeFile
    const createdObjStr = JSON.stringify(createdObj);
    fs.writeFile(`${this.rootDir}/${_id}`, createdObjStr, err => {
      //callback(err, objWithId);
      callback(err, createdObj);
    });
  }
}

module.exports = Store;
