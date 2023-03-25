const Joi = require("joi");

const reValidationScheme = Joi.object({
  email: Joi.string().min(2).max(30).required().email(),
});

module.exports = {
  reValidationScheme,
};
