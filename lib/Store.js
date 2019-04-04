const uuid = require('uuid/v4');
const fs = require('fs');

class Store{
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(object, callback) {
    const id = uuid();
    
    object._id = id;
    const json = JSON.stringify(object);
    fs.writeFile(`${this.rootDir}/${id}.json`, json, 'utf8', err => {
      // if(err) throw err;

      callback(err, JSON.parse(json));
    });
  }

}

module.exports = Store;
