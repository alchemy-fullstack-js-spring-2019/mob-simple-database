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

  findAll(callback) {
    fs.readdir(this.rootDir, 'utf8', (err, fileList) => {
      if(err) return callback(err, null);
      let arrayOfAnimals = [];
      let counter = 0;
      fileList.forEach(file => {
        fs.readFile(`${this.rootDir}/${file}`, 'utf8', (err, animalJsonObject) => {
          arrayOfAnimals.push(JSON.parse(animalJsonObject));
          counter++;
          if(counter === fileList.length) {
            callback(err, arrayOfAnimals);
          }
        });
      });
    });
  }
}

module.exports = Store;
