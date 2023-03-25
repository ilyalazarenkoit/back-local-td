const Joi = require("joi");

const authScheme = Joi.object({
  email: Joi.string().min(2).max(30).required().email(),

  password: Joi.string().min(5).max(15).required(),

  role: Joi.string().valid("top-manager", "manager").required(),
});

module.exports = {
  authScheme,
};
