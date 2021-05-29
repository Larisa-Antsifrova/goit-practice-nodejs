const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const catsPath = path.join(__dirname, 'cats.json');

const readCats = async () => {
  const data = await fs.readFile(catsPath, 'utf-8');
  return JSON.parse(data);
};

const getAllCats = async () => {
  return await readCats();
};

const getCatById = async id => {
  const data = await readCats();
  const requiredCat = data.find(cat => cat.id === id);
  return requiredCat;
};

const removeCat = async id => {
  const data = await readCats();
  const index = data.findIndex(cat => cat.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedCat] = data.splice(index, 1);
  await fs.writeFile(catsPath, JSON.stringify(data, null, 2));
  return deletedCat;
};

const addCat = async body => {
  const id = uuid();
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  const data = await readCats();
  data.push(record);
  await fs.writeFile(catsPath, JSON.stringify(data, null, 2));
  return record;
};

const updateCat = async (id, body) => {
  const data = await readCats();
  const [catToUpdate] = data.filter(cat => cat.id === id);

  if (catToUpdate) {
    Object.assign(catToUpdate, body);
    await fs.writeFile(catsPath, JSON.stringify(data, null, 2));
  }
  return catToUpdate;
};

module.exports = {
  getAllCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
};
