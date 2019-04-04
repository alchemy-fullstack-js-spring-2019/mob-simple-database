const Store = require('../lib/store.js');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

describe('Store Class', () => {
  const rootDirectory = './root';
  const options = { encoding: 'utf8' };
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

  it('create makes obj with id', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    const store = new Store(rootDirectory);
    store.create(obj, (err, objSaved) => {
      expect(err).toBeFalsy();
      expect(objSaved.name).toEqual(obj.name);
      expect.any(objSaved._id);
      done();
    });
  });

  it('create writes to root/id', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    const store = new Store(rootDirectory);
    store.create(obj, (err, objSaved) => {
      expect(err).toBeFalsy();
      const filePath = path.join(rootDirectory, objSaved._id);
      fs.readFile(filePath, options, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(JSON.stringify(objSaved));
        done();
      });
    });
  });
});
