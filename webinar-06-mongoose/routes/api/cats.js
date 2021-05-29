const express = require('express');
const router = express.Router();
const Controllers = require('../../controllers/cats-controllers');
const { validateAddCat, validateUpdateCat, validateUpdateVaccinatedCat } = require('./validaton');

router.get('/', Controllers.getAllCats).post('/', validateAddCat, Controllers.addCat);

router
  .get('/:id', Controllers.getCatById)
  .delete('/:id', Controllers.removeCat)
  .put('/:id', validateUpdateCat, Controllers.updateCat);

router.patch('/:id/vaccinated', validateUpdateVaccinatedCat, Controllers.updateCat);

module.exports = router;
