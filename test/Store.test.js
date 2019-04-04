const uuid = require('uuid/v4');
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
      species: 'dog',
    };

    jsonTwo = {
      name: 'flipper',
      species: 'penguin'
    };
  });

  // afterEach(done => {

  // })

  it('has create method', done => {

    animalDb.create(jsonOne, (err, animal) => {
      fs.readFile(`./animalsdb/${animal._id}.json`, 'utf8', (err, data) => {
        // if(err) throw err;
        expect(err).toBeFalsy();
        const obj = JSON.parse(data);
        expect(obj).toEqual(jsonOne);
        done();
      });
    });
  });
});
