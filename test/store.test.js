const Store = require('../lib/store');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('Store() thing', () => {
  const rootDir = path.join(__dirname, 'database');
  const db = new Store(rootDir);
  beforeEach(done => {
    mkdirp(rootDir, done); 
  });
  afterEach(done => {
    rimraf(rootDir, done);
  });
  beforeEach(done => {
    const pets = {
      name: 'Mister',
      age: 8
    };
    db.create(pets, done);
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
  describe('find by ID', () => {
    it('finds an obj by id', () => {
      const pets = {
        name: 'Mister',
        age: 8
      };
      db.create(pets, (err, newPet) => {
        db.findById(newPet._id, (err, objectFromFile) => {
          if(err) throw err;
          expect(newPet).toEqual(objectFromFile);
        });
      });
    });
  });
});
