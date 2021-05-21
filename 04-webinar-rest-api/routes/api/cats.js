const express = require('express');
const router = express.Router();
const Cats = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const cats = Cats.getAllCats();
    res.json({ status: 'success', code: 200, payload: { cats } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const requiredCat = await Cats.getCatById(id);
    if (requiredCat) {
      return res.json({ status: 'success', code: 200, payload: { cat: requiredCat } });
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const cat = await Cats.addCat(req.body);
    return res.status(201).json({ status: 'success', code: 201, payload: { cat: cat } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const removedCat = await Cats.removeCat(id);
    if (removedCat) {
      return res.json({ status: 'success', code: 200, message: 'The cat was deleted' });
    }
    return res.json({ status: 'success', code: 204, message: 'The cat does not exist' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:id/vaccinated', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
