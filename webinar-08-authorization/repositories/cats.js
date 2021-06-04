const Cat = require('../model/cat');

const getAllCats = async userId => {
  const results = await Cat.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email gender -_id',
  });
  return results;
};

const getCatById = async (userId, id) => {
  const result = await Cat.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender -_id',
  });
  return result;
};

const removeCat = async (userId, id) => {
  const result = await Cat.findOneAndRemove({ _id: id, owner: userId });
  return result;
};

const addCat = async (userId, body) => {
  const result = await Cat.create({ ...body, owner: userId });
  return result;
};

const updateCat = async (userId, id, body) => {
  const result = await Cat.findOneAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true });
  return result;
};

module.exports = {
  getAllCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
};
