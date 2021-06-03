const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers/cats-controllers');
const { validateAddCat, validateUpdateCat, validateUpdateVaccinatedCat, validateMongoId } = require('./validaton');
const guard = require('../../../helpers/guard');

router.get('/', guard, Controllers.getAllCats).post('/', guard, validateAddCat, Controllers.addCat);

router
  .get('/:id', guard, validateMongoId, Controllers.getCatById)
  .delete('/:id', guard, validateMongoId, Controllers.removeCat)
  .put('/:id', guard, validateMongoId, validateUpdateCat, Controllers.updateCat);

router.patch('/:id/vaccinated', guard, validateMongoId, validateUpdateVaccinatedCat, Controllers.updateCat);

module.exports = router;
