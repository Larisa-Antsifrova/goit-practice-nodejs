const express = require('express');
const router = express.Router();
const Cats = require('../../model/cats');
const { validateAddCat, validateUpdateCat, validateUpdateVaccinatedCat } = require('./validaton');

router.get('/', async (req, res, next) => {
  try {
    const cats = await Cats.getAllCats();
    return res.json({ status: 'success', code: 200, cats });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const requiredCat = await Cats.getCatById(id);
    if (requiredCat) {
      return res.json({ status: 'success', code: 200, cat: requiredCat });
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateAddCat, async (req, res, next) => {
  try {
    const cat = await Cats.addCat(req.body);
    return res.status(201).json({ status: 'success', code: 201, cat });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const removedCat = await Cats.removeCat(id);
    if (removedCat) {
      return res.json({ status: 'success', code: 200, message: 'The cat was deleted', cat: removedCat });
    }
    return res.json({ status: 'success', code: 204, message: 'The cat does not exist' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUpdateCat, async (req, res, next) => {
  try {
    const id = req.params.id;
    const catToUpdate = await Cats.updateCat(id, req.body);
    if (catToUpdate) {
      return res.json({ status: 'success', code: 200, message: 'The cat was updated', cat: catToUpdate });
    }
    return res.json({ status: 'error', code: 404, message: 'The cat was not found' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/vaccinated', validateUpdateVaccinatedCat, async (req, res, next) => {
  try {
    const id = req.params.id;
    const catToUpdate = await Cats.updateCat(id, req.body);
    if (catToUpdate) {
      return res.json({ status: 'success', code: 200, message: 'The cat was updated', cat: catToUpdate });
    }
    return res.json({ status: 'error', code: 404, message: 'The cat was not found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
