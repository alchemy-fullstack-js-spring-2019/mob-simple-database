const Store = require('../lib/store.js');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const rootDirectory = './root';
const options = { encoding: 'utf8' };
let store = null;

describe('Store Class', () => {

  beforeEach(done => {
    mkdirp(rootDirectory, () => {
      store = new Store(rootDirectory);
      done();
    });
  });

  afterEach(done => {
    rimraf(rootDirectory, () => {
      done();
    });
  });

  it('has property path', () => {
    expect(store.rootDirectory).toEqual(rootDirectory);
  });

  it('create makes obj with id', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    store.create(obj, (err, objSaved) => {
      expect(err).toBeFalsy();
      expect(objSaved.name).toEqual(obj.name);
      expect.any(objSaved._id);
      done();
    });
  });

  it('create writes to root/id', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    store.create(obj, (err, objSaved) => {
      expect(err).toBeFalsy();
      const filePath = path.join(rootDirectory, objSaved._id);
      fs.readFile(filePath, options, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(JSON.stringify(objSaved));
        done();
      });
    });
  });

  it('findById takes an id and has a callback with error and obj from file', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    store.create(obj, (err, objSaved) => {
      expect(err).toBeFalsy();
      
      store.findById(objSaved._id, (err, objFromFile) => {
        expect(err).toBeFalsy();
        expect(objFromFile).toEqual(objSaved);
        done();
      });
    });
  });

  it('returns null if bad id', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    store.create(obj, err => {
      expect(err).toBeFalsy();
      
      store.findById('42', (err, objFromFile) => {
        expect(err).toBeTruthy();
        expect(objFromFile).toEqual(null);
        done();
      });
    });
  });

  it('findByIdAndDelete takes id and returns callback with error and success object', done => {
    const obj = {
      name: 'guy',
      age: 13
    };
    store.create(obj, (err, objSaved) => {
      expect(err).toBeFalsy();
      store.findByIdAndDelete(objSaved._id, (err, removedSuccessObject) => {
        expect(err).toBeFalsy();
        expect(removedSuccessObject).toEqual({ deleted: 1 });
        done();
      });
    });
  });
  
  // it('findByIdAndDelete returns { deleted: 0 } with bad id', done => {
  //   const obj = {
  //     name: 'guy',
  //     age: 13
  //   };
  //   store.create(obj, err => {
  //     expect(err).toBeFalsy();
  //     store.findByIdAndDelete('42', (err, removedSuccessObject) => {
  //       expect(err.code).toEqual('ENOENT');
  //       expect(removedSuccessObject).toEqual({ deleted: 0 });
  //       done();
  //     });
  //   });
  // });
  
  it('find returns empty array', done => {
    store.find((err, objArr) => {
      expect(err).toBeFalsy();
      expect(objArr).toEqual([]);
      done();
    });
  });
});

// describe('find', () => {

//   const origArray = [
//     { something: 'whatever' },
//     { something: 'stuff' }
//   ];

//   beforeEach(done => {
//     mkdirp('./root2', () => {
//       store = new Store('./root2');
      
//       let count = 0;
//       origArray.forEach((obj) => {
//         store.create(obj, () => {
//           count++;
//           if(count >= origArray.length) done();
//         });
//       });
//     });
//   });

//   afterEach(done => {
//     rimraf('./root2', done);
//   });

//   it('Does what?', () => {
//     const expected = 5;
//     const result = 5;
  
//     expect(result).toEqual(expected);
//   });

//   it('find returns array of objects in the root', done => {
//     store.find((err, objArr) => {
//       expect(err).toBeFalsy();
//       expect(objArr.length).toEqual(origArray.length);
//       expect(objArr[0].something).toEqual(origArray[0].something);
//       done();
//     });
//   });
// });
