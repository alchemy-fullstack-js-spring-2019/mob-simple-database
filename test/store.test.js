const Store = require('../lib/store.js');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('Store Class', () => {
  const rootDirectory = './root';
  beforeEach(done => {
    mkdirp(rootDirectory, done);
  });
  afterEach(done => {
    rimraf(rootDirectory, done);
  });

  it('has property path', () => {
    const store = new Store(rootDirectory);
    expect(store.rootDirectory).toEqual(rootDirectory);
  });
});
