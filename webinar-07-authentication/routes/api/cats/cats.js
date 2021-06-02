const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers/cats-controllers');
const { validateAddCat, validateUpdateCat, validateUpdateVaccinatedCat, validateMongoId } = require('./validaton');

router.get('/', Controllers.getAllCats).post('/', validateAddCat, Controllers.addCat);

router
  .get('/:id', validateMongoId, Controllers.getCatById)
  .delete('/:id', validateMongoId, Controllers.removeCat)
  .put('/:id', validateMongoId, validateUpdateCat, Controllers.updateCat);

router.patch('/:id/vaccinated', validateMongoId, validateUpdateVaccinatedCat, Controllers.updateCat);

module.exports = router;
