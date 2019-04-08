const MemoryDatabase = require('../lib/store');

describe('MemoryDatabase', () => {
  let db  = null;
  beforeEach(() => {
    db = new MemoryDatabase();
  });

  it('creates an obj in db', () => {
    const cat = { name: 'fluffy' };
    const createdCat = db.create(cat);
    expect(createdCat.name).toEqual('fluffy');
  });

  it('can find an obj by id in the db', () => {
    const cat = { name: 'fluffy' };
    const createdCat = db.create(cat);

    const foundCat = db.findById(createdCat._id);
    expect(foundCat).toEqual(createdCat);
  });

  it('throws error when obj does not exist', () => {
    expect(() => {
      db.findById('notARealId');
    }).toThrowError('No object with _id notARealId');
  });

  it('lists all objects in the database', () => {
    const cat = { name: 'fluffy' };
    const createdCat = db.create(cat);
    const dog = { name: 'perro' };
    const createdDog = db.create(dog);

    const allItems = db.find();
    expect(allItems).toEqual([createdCat, createdDog]);
  });

  it('can find an obj by id in the db and replace it with another', () => {
    const cat = { name: 'fluffy' };
    const createdCat = db.create(cat);
    const catB = { name: 'thatcat' };
    const createdCatB = db.create(catB);
  
    const foundCat = db.findByIdAndUpdate(createdCat._id, createdCatB);
    console.log('store', db.find());
    expect(foundCat).toEqual(createdCatB);
  });

  it('throws error when obj does not exist', () => {
    expect(() => {
      db.findByIdAndUpdate('notARealId');
    }).toThrowError('No object with _id notARealId');
  });

  it('can find an object by id and delete it', () => {
    const cat = { name: 'fluffy' };
    const createdCat = db.create(cat);
    const deletedCat = db.findByIdAndDelete(createdCat._id);
    expect(deletedCat).toEqual({ deleted: 1 });
  });

  it('throws error when obj does not exist', () => {
    expect(() => {
      db.findByIdAndDelete('notARealId');
    }).toThrowError('No object with _id notARealId');
  });

  it('can delete all objects in a database', () => {
    const cat = { name: 'fluffy' };
    db.create(cat);
    const dog = { name: 'dawg' };
    db.create(dog);

    db.drop();
    expect(db.drop()).toBeFalsy();
  });
});

