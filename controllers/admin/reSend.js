const { createHttpException } = require("../../helpers/createHTTPexeptions");
const AdminModel = require("../../models/admins/admins");
const { sendVerificationMail } = require("../../services/email");

const reSendVerificationMail = async (req, res, next) => {
  const errMsg = "Bad request";
  try {
    const { email } = req.body;
    const findAdmin = await AdminModel.findAdminByArg({ email });
    if (!findAdmin) {
      throw createHttpException(400, errMsg);
    }
    if (findAdmin.verify) {
      throw createHttpException(400, errMsg);
    }
    await sendVerificationMail(email, findAdmin.emailVerificationToken);
    res.status(200).json("Please check your email with verification message");
  } catch (error) {
    throw createHttpException(400, errMsg);
  }
};

module.exports = {
  reSendVerificationMail,
};
