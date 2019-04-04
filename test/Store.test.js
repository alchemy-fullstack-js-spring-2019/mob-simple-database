const uuid = require('uuid/v4');
const fs = require('fs');
const Store = require('../lib/Store');


describe('Store', () => {
  let jsonOne = null;
  let jsonTwo = null;
  let animalDb = null;

  beforeEach(() => {
    animalDb = new Store('../animal-db');
    
    jsonOne = {
      name: 'spot',
      species: 'dog'
    };

    jsonTwo = {
      name: 'flipper',
      species: 'penguin'
    };
  });

  // add afterEach

  it('has create method', done => {

    animalDb.create(jsonOne, (err, animal) => {
      fs.readFile(`../animal-db/${animal._id}`, 'utf8', (err, data) => {
        if(err) return err;
        expect(err).toBeFalsy();
        expect(data).toEqual(jsonOne);
        done();
      });

    });

  });


});
