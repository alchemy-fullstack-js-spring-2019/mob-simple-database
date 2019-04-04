const Store = require('../lib/store');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

console.log(Store, mkdirp, rimraf);
describe('Store() thing', () => {
  const rootDir = path.join(__dirname, 'database');
  console.log(rootDir);
  const db = new Store(rootDir);
  beforeEach(done => {
    mkdirp(rootDir, done); 
  });
  afterEach(done => {
    rimraf(rootDir, done);
  });
  describe('create method', () => {
    it('checks that obj passed to .create() has uuid', done => {
      const pets = {
        name: 'Mister',
        age: 8
      };
      db.create(pets, (err, newPet) => {
        expect(newPet._id).toEqual(expect.any(String));
        done(err);
      });
    });
  });
});
