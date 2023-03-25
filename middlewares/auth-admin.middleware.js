const { createHttpException } = require("../helpers/createHTTPexeptions");
const jsonwebtoken = require("jsonwebtoken");
const AdminModel = require("../models/admins/admins");
require("dotenv").config();
const { JWT_SECRET: jwtSecret } = process.env;
const authAdmin = async (req, res, next) => {
  const notAuthorizedError = "Not authorized";
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createHttpException(401, notAuthorizedError);
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createHttpException(401, notAuthorizedError);
    }
    try {
      const { sessionKey } = jsonwebtoken.verify(token, jwtSecret);
      const findAdmin = await AdminModel.findAdminByArg({
        sessionKey,
      });
      if (!findAdmin) {
        throw createHttpException(401, notAuthorizedError);
      }

      req.admin = findAdmin;
      next();
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authAdmin,
};
