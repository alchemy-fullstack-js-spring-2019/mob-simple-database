// const Store = require('../lib/store.js');
// const mkdirp = require('mkdirp');
// const rimraf = require('rimraf');
// const fs = require('fs');
// const path = require('path');
// const origArray = [
//   { something: 'whatever' },
//   { something: 'stuff' }
// ];

// mkdirp('./root2', () => {
//   const store = new Store('./root2');
//   origArray.forEach((obj, i) => {
//     store.create(obj, () => null);
//     if(i === origArray.length - 1) console.log('Done');
//   });
// });
