const db = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const getAllCats = async () => {
  const collection = await getCollection(db, 'cats');
  const results = await collection.find({}).toArray();
  return results;
};

const getCatById = async id => {
  const collection = await getCollection(db, 'cats');
  const objId = new ObjectId(id);
  const [results] = await collection.find({ _id: objId }).toArray();
  return results;
};

const removeCat = async id => {
  const collection = await getCollection(db, 'cats');
  const objId = new ObjectId(id);

  const { value: result } = await collection.findOneAndDelete({ _id: objId });

  return result;
};

const addCat = async body => {
  const collection = await getCollection(db, 'cats');

  const record = {
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };

  const {
    ops: [result],
  } = await collection.insertOne(record);

  return result;
};

const updateCat = async (id, body) => {
  const collection = await getCollection(db, 'cats');
  const objId = new ObjectId(id);

  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false }
  );

  return result;
};

module.exports = {
  getAllCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
};
