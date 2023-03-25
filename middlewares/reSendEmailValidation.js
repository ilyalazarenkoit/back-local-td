const { createHttpException } = require("../helpers/createHTTPexeptions");
const { reValidationScheme } = require("../helpers/schemas/auth/reValidation");

const reSendEmailValidation = async (req, res, next) => {
  try {
    const { error } = await reValidationScheme.validate(req.body);
    if (error) {
      throw createHttpException(400, "Bad request");
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  reSendEmailValidation,
};
