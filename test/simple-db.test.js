const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const path = require('path');
const Store = require('../lib/simple-db');
const rootDirectory = path.join(__dirname, 'animals');

describe('Store', () => {
  beforeEach(done => {
    mkdirp(rootDirectory, done);
  });
  let store = null;
  beforeEach(() => {
    store = new Store(rootDirectory);
  });
  afterEach(done => {
    rimraf(rootDirectory, done);
  });
  
  it('has a root dir', () => {
    expect(store.rootDir).toEqual(rootDirectory);
  });

  it('creates an object in our store', done => {
    const snake = {
      type: 'cobra'
    };
    store.create(snake, (err, createdSnake) => {
      expect(createdSnake).toEqual({ ...snake, _id: expect.any(String) });
      done();
    });
  });
  
});
