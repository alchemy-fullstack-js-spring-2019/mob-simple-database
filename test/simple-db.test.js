const rimraf = require('rmraf');
const mkdirp = require('mkdirp');

describe('Store', () => {
  beforeEach(done => {
    mkdirp('./data', done);
  });

  afterEach(done => {
    rimraf('./data', done);
  });

  it('can create a new json file', () => {

  });
});
