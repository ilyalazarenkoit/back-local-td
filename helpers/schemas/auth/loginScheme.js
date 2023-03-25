const Joi = require("joi");

const loginScheme = Joi.object({
  email: Joi.string().min(2).max(30).required().email(),

  password: Joi.string().min(5).max(15).required(),
});

module.exports = {
  loginScheme,
};
