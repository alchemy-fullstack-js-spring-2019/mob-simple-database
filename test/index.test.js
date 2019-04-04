const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const Store = require('../lib/index.js');

describe('', () => {
  beforeEach((done) => {
    mkdirp('./lib/danimals', done);
  });

  afterEach((done) => {
    rimraf('./lib/danimals', done);
  });

  it('create new json file', () => {
    // expect
  });
});
