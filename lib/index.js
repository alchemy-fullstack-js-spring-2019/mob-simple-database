const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDirectory){
    this.rootDirectory = rootDirectory;
  }

  create(obj, callback) {
    const id = shortid();
    const path = this.rootDirectory + '/' + id + '.json';
    const newObj = JSON.stringify({ ...obj, _id: id });
    fs.writeFile(path, newObj, (err) => {
      if(err) return callback(err);
      callback(null, JSON.parse(newObj));
    });
  }

  findById(id, callback){
    const path = this.rootDirectory + '/' + id + '.json';
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) return callback(err);
      callback(null, JSON.parse(data));
    });
  }
  
  findByIdAndDelete(id, callback){
    const path = this.rootDirectory + '/' + id + '.json';
    fs.unlink(path, (err) => {
      if(err) {
        callback(err, { deleted: false });
      } else {
        callback(null, { deleted: true }); 
      }
    });
  }

  find(callback) {
    let arrayOfObjects = [];
    const path = this.rootDirectory;
    fs.readdir(path, 'utf8', (err, files) => {
      if(err) throw err;
      files.forEach(file => {
        let path = this.rootDirectory + '/' + file;
        fs.readFile(path, 'utf8', (err, data) => {
          const parseData = JSON.parse(data);
          arrayOfObjects.push(parseData);
          if(err) callback(err, arrayOfObjects);
          callback(null, arrayOfObjects);
        });
      });
    });
  }

}

module.exports = {
  Store
};
