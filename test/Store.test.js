const fs = require('fs');
const Store = require('../lib/Store');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');


describe('Store', () => {
  let jsonOne = null;
  let jsonTwo = null;
  
  let animalDb = null;

  beforeEach(done => {
    mkdirp('./animalsdb', done);

    animalDb = new Store('./animalsdb');

    jsonOne = {
      name: 'spot',
      species: 'dog'
    };

    jsonTwo = {
      name: 'flipper',
      species: 'penguin'
    };
  });

  afterEach(done => {
    rimraf('./animalsdb', done);
  });

  it('has create method', done => {

    animalDb.create(jsonOne, (err, animal) => {
      fs.readFile(`./animalsdb/${animal._id}.json`, 'utf8', (err, data) => {
        expect(err).toBeFalsy();
        let jsonOnePlusId = { ...jsonOne };
        jsonOnePlusId._id = animal._id;
        expect(JSON.parse(data)).toEqual(jsonOnePlusId);
        done();
      });
    });
  });

  it('finds a JSON file by id and returns json', done => {
    animalDb.create(jsonOne, (err, animal) => {
      animalDb.findById(animal._id, (err, animalJsonObject) => {
        expect(err).toBeFalsy();
        expect(animal).toEqual(animalJsonObject);
        done();
      });
    });
  });
  
  it('finds a JSON file by bad id fails', done => {
    animalDb.findById(11111, (err, animalJsonObject) => {
      expect(err).toBeTruthy();
      expect(animalJsonObject).toEqual(null);
      done();
    });
  });

  it('finds by id and deletes', done => {
    animalDb.create(jsonOne, (err, animal) => {
      animalDb.deleteById(animal._id, (err, removedObject) => {
        expect(err).toBeFalsy();
        expect(removedObject).toEqual({ deleted: 1 });
        animalDb.findById(animal._id, (err, animalJsonObject) => {
          expect(err).toBeTruthy();
          expect(animalJsonObject).toEqual(null);
          done();
        });
      });
    });
  });

  it('cannot find id, won\'t delete anything', done => {
    animalDb.deleteById(143243, (err, removedObject) => {
      expect(err).toBeTruthy();
      expect(removedObject).toEqual({ deleted: 0 });
      done();
    });
  });

  it('find by objects, if objects', done => {
    animalDb.create(jsonOne, (err, animal) => {
      animalDb.create(jsonTwo, (err, animal2) => {
        animalDb.findAll((err, objectArray) => {
          const testAnimalsPlusId = [{ ...jsonOne, _id: animal._id }, { ...jsonTwo, _id: animal2._id }];
          expect(err).toBeFalsy();
          expect(objectArray).toEqual(testAnimalsPlusId);
          done();
        });
      });
    });
  });

  it('returns empty array when no files', done => {   
    animalDb.findAll((err, objectArray) => {
      expect(err).toBeFalsy();
      expect(objectArray).toEqual([]);
      done();
    });
  });
});
