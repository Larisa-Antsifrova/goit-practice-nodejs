const Cat = require('../model/cat');

const getAllCats = async () => {
  const results = await Cat.find();
  return results;
};

const getCatById = async id => {
  const result = await Cat.findOne({ _id: id });
  return result;
};

const removeCat = async id => {
  const result = await Cat.findOneAndRemove({ _id: id });
  return result;
};

const addCat = async body => {
  const result = await Cat.create(body);
  return result;
};

const updateCat = async (id, body) => {
  const result = await Cat.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
  return result;
};

module.exports = {
  getAllCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
};
