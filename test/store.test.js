const Store = require('../lib/store');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const fs = require('fs');

describe('store database', () => {

    let testStore = null;
    beforeEach(done => {
        mkdirp('./data', done);
        testStore = new Store('./data');
    });

    afterEach(done => {
        rimraf('./data', done);
    });

    describe('create method', () => {
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
    });

    describe('findById', () => {
        it('returns a parsed object from the file with the inputed id', done => {
            testStore.create({ name: 'bob', species: 'sponge' }, (err, savedAnimalWithId) => {
                if(err) throw err;
                testStore.findById(savedAnimalWithId._id, (err, objectFromFile) => {
                    if(err) throw err;
                    expect(objectFromFile).toEqual(savedAnimalWithId);
                    done();
                });
            });
        });
        it('returns null if no file matches given id', done => {
            testStore.findById(123456, (err, objectFromFile) => {
                expect(objectFromFile).toBeNull();
                done();
            });
        });
    });
    describe('findByIdAndRemove function', () => {
        it('find object by id and remove  it once found', done => {
            testStore.create({ name: 'bob', species: 'sponge' }, (err, savedAnimalWithId) => {
                if(err) throw err;
                testStore.findByIdAndDelete(savedAnimalWithId._id, (err, deletedMessage) => {
                    if(err) throw err;
                    expect(deletedMessage).toEqual({ deleted: 1 });
                    testStore.findById(savedAnimalWithId._id, (err, objectFromFile) => {
                        expect(objectFromFile).toBeNull();
                        done();
                    });
                });
            });
        });
    });
});
