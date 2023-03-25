const { createHttpException } = require("../../helpers/createHTTPexeptions");
const AdminModel = require("../../models/admins/admins");
const emailVerification = async (req, res, next) => {
  try {
    const { emailVerificationToken } = req.params;
    const findAdmin = await AdminModel.findAdminByArg({
      emailVerificationToken,
    });

    if (!findAdmin) {
      throw createHttpException(404, "Not found");
    }
    await AdminModel.findAdminByIdAndUpdate(findAdmin.id, {
      ...findAdmin,
      ...{ emailVerificationToken: null, verify: true },
    });
    res.status(200).send("Verification is successful");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  emailVerification,
};
