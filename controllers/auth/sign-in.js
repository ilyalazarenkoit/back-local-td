const AdminModel = require("../../models/admins/admins");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../jwt/index");
const crypto = require("crypto");

const signIn = async (req, res, next) => {
  const authorizationError = "Email or password is wrong";
  const { email, password } = req.body;
  try {
    const findAdmin = await AdminModel.findAdminByArg({ email });

    if (!findAdmin) {
      throw createHttpException(401, authorizationError);
    }
    if (!findAdmin.verify) {
      throw createHttpException(401, `Please verify your email`);
    }

    try {
      const isValidPassword = await bcrypt.compare(
        password,
        findAdmin.passwordHash
      );
      if (!isValidPassword) {
        throw createHttpException(401, authorizationError);
      }
    } catch (error) {
      next(createHttpException(401, authorizationError));
    }

    const sessionKey = crypto.randomUUID();
    await AdminModel.findAdminByIdAndUpdate(findAdmin.id, {
      ...findAdmin,
      sessionKey,
    });
    const accsessToken = createAccessToken({
      adminId: findAdmin.id,
      sessionKey,
    });
    res.status(200).send(accsessToken);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
};
