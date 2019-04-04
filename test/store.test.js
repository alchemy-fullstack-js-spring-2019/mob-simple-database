const Store = require('../lib/store.js');
describe('Store Class', () => {
  it('has property path', () => {
    const rootDirectory = './root';
    const store = new Store(rootDirectory);
    expect(store.rootDirectory).toEqual(rootDirectory);
  });
});
