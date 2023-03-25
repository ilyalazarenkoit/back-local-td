const Joi = require("joi");

const updateUserScheme = Joi.object({
  name: Joi.string().min(2).max(15),

  email: Joi.string().min(2).max(30).email(),

  phone: Joi.string().min(5).max(15),

  admin: Joi.string(),

  username: Joi.string(),

  address: Joi.object(),

  website: Joi.string(),

  company: Joi.object(),
});

module.exports = {
  updateUserScheme,
};
