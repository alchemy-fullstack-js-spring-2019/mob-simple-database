const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const { Store } = require('../lib/index.js');

describe('', () => {
  const store = new Store('./lib/danimals');
  beforeEach((done) => {
    mkdirp('./lib/danimals', done);
  });

  afterEach((done) => {
    rimraf('./lib/danimals', done);
  });

  it('create new json file', (done) => {
    const obj = { cat: 'kitty' };
    store.create(obj, (err, newObj) => {
      if(err) throw err;
      expect(newObj._id).toEqual(expect.any(String));
      done();
    });
  });

  it('finds file by id return parsed object', (done) => {
    const obj = { caret: 'kitty' };
    store.create(obj, (err, newObj) => {
      if(err) throw err;
      store.findById(newObj._id, (err, foundObject) => {
        if(err) throw err;
        expect(foundObject).toEqual({ ...obj, _id: newObj._id });
        done();
      });
    });
  });

  it('find by id and delete', (done) => {
    store.create({ ugh: 'k' }, (err, newObj) => {
      if(err) throw err;
      store.findByIdAndDelete(newObj._id, (err, removedObject) => {
        if(err) return removedObject;
        expect(removedObject).toEqual({ deleted: 1 });
        done();
      });
    });

  });

  it('throw error object if no file', (done) => {
    store.create({ ugh: 'k' }, (err, newObj) => {
      if(err) throw err;
      store.findByIdAndDelete(555, (err, removedObject) => {
        if(err) return removedObject;
        expect(removedObject).toEqual({ deleted: 0 });
        done();
      });
    });

  });

});
