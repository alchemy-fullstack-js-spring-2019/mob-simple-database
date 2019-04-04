const fs = require('fs');
const uuid = require('uuid/v4');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    const _id = uuid();
    const createdObj = { ...obj, _id };
    const createdObjStr = JSON.stringify(createdObj);
    fs.writeFile(`${this.rootDir}/${_id}`, createdObjStr, err => {
      callback(err, createdObj);
    });
  }

  findById(id, callback) {
    fs.readFile(`${this.rootDir}/${id}`, { encoding: 'utf8' }, (err, data) => {
      if(err) return callback(err);
      const json = JSON.parse(data);
      callback(null, json);
    });
  }
  
}

module.exports = Store;
