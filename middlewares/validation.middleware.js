const { authScheme } = require("../helpers/schemas/auth/authScheme");
const { createHttpException } = require("../helpers/createHTTPexeptions");
const { loginScheme } = require("../helpers/schemas/auth/loginScheme");
const validation = async (req, res, next) => {
  try {
    if (req.route.path === "/register") {
      const { error } = await authScheme.validate(req.body);
      if (error) {
        throw createHttpException(400, "Bad request");
      }
    }
    if (req.route.path === "/login") {
      const { error } = await loginScheme.validate(req.body);
      if (error) {
        throw createHttpException(400, "Bad request");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  validation,
};
