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
});
