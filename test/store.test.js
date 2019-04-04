const Store = require('../lib/store');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const fs = require('fs');

describe('store database', () => {

    let testStore = null;
    beforeEach(done => {
        mkdirp('./data', done);
        testStore = new Store();
    });

    afterEach(done => {
        rimraf('./data', done);
    });

    it('check create method saves an object with the inputted name', done => {
        testStore.create({ name: 'bob', species: 'sponge' }, (err, savedAnimalWithId) => {
            if(err) throw err;
            expect(savedAnimalWithId.name).toEqual('bob');
            done();
        });
    });
    it('check create method saves an object with id', done => {
        testStore.create({ name: 'bob', species: 'sponge' }, (err, savedAnimalWithId) => {
            if(err) throw err;
            expect(savedAnimalWithId._id).toEqual(expect.any(String));
            done();
        });
    });
    //test for id
    //test for string
    //
});
