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
    // find file that matches id
    // pull json then parse
    // return obj in callback;
  }
}

module.exports = {
  Store
};
