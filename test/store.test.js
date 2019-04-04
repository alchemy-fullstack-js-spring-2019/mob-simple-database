const Store = require('../lib/store');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('store database', () => {

    let testStore = null;
    beforeEach(done => {
        mkdirp('./data', done);
        testStore = new Store();
    });

    afterEach(done => {
        rimraf('./data', done);
    });

    it('create method makes id property for the object and saves to a file', () => {
        testStore.create({ name: 'bob', species: 'sponge' }, (err, savedAnimalWithId) => {
            if(err) throw err;
            expect(savedAnimalWithId.name).toEqual('bob');
        });
    });
});
