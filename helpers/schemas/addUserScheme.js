const Joi = require("joi");

const addUserScheme = Joi.object({
  name: Joi.string().min(2).max(15).required(),

  email: Joi.string().min(2).max(30).required().email(),

  phone: Joi.string().min(5).max(15).required(),

  admin: Joi.string(),

  username: Joi.string(),

  address: Joi.object(),

  website: Joi.string(),

  company: Joi.object(),
});

module.exports = {
  addUserScheme,
};
