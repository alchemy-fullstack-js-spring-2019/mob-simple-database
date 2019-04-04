const Store = require('../lib/store');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

console.log(Store, mkdirp, rimraf);
describe('create an obj', () => {

  afterEach(done => {
    fs.unlink('./some.file', done);
  });

  it('');
});

