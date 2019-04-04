const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  create(obj, callback) {
    //create a uuid
    //fs.writeFile
    //callback(err, objWithId)
  }
}

module.exports = Store;
