const Joi = require('joi');

const schemaAddCat = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(0).max(35).required(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(0).max(35).optional(),
  isVaccinated: Joi.boolean().optional(),
}).or('name', 'age', 'isVaccinated');

const schemaUpdateVaccinatedCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validateRequest = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validateAddCat: (req, res, next) => {
    return validateRequest(schemaAddCat, req.body, next);
  },
  validateUpdateCat: (req, res, next) => {
    return validateRequest(schemaUpdateCat, req.body, next);
  },
  validateUpdateVaccinatedCat: (req, res, next) => {
    return validateRequest(schemaUpdateVaccinatedCat, req.body, next);
  },
};
