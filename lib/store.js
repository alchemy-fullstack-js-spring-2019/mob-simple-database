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
  findByIdAndDelete(id, callback) {
    const filePath = path.join(this.rootDirectory, id);
    fs.unlink(filePath, err => {
      if(err) return callback(err, { deleted: 0 });
      callback(null, { deleted: 1 });
    });
  }
  find(callback) {
    fs.readdir(this.rootDirectory, (err, files) => {
      if(err) return callback(err, null);

      const objArr = [];
      if(files.length === 0) return callback(null, objArr);
      
      let count = 0;
      files.forEach(file => {
        this.findById(file, (err, data) => {
          count ++;
          objArr.push(data);
          if(count >= files.length) callback(null, objArr);
        });
      });
    });
  }
};
