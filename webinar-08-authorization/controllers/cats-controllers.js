const Cats = require('../repositories/cats');

const getAllCats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: cats, ...rest } = await Cats.getAllCats(userId, req.query);
    return res.json({ status: 'success', code: 200, data: { cats, ...rest } });
  } catch (error) {
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const requiredCat = await Cats.getCatById(userId, id);
    if (requiredCat) {
      return res.json({ status: 'success', code: 200, cat: requiredCat });
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const addCat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await Cats.addCat(userId, req.body);
    return res.status(201).json({ status: 'success', code: 201, cat });
  } catch (error) {
    next(error);
  }
};

const removeCat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const removedCat = await Cats.removeCat(userId, id);
    if (removedCat) {
      return res.json({ status: 'success', code: 200, message: 'The cat was deleted', cat: removedCat });
    }
    return res.json({ status: 'success', code: 204, message: 'The cat does not exist' });
  } catch (error) {
    next(error);
  }
};

const updateCat = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const catToUpdate = await Cats.updateCat(userId, id, req.body);
    if (catToUpdate) {
      return res.json({ status: 'success', code: 200, message: 'The cat was updated', cat: catToUpdate });
    }
    return res.json({ status: 'error', code: 404, message: 'The cat was not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCats, getCatById, addCat, removeCat, updateCat };
