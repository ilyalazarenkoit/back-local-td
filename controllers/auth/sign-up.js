const AdminModel = require("../../models/admins/admins");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { sendVerificationMail } = require("../../services/email");
const signUp = async (req, res, next) => {
  const authorizationError = "User is already exists";
  const { email, password, role } = req.body;
  try {
    const findAdmin = await AdminModel.findAdminByArg({ email });
    if (findAdmin) {
      throw createHttpException(401, authorizationError);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const emailVerificationToken = nanoid(30);
    await AdminModel.createNewAdmin({
      email,
      passwordHash,
      role: role || "manager",
      emailVerificationToken,
      verify: false,
      users: [],
    });
    await sendVerificationMail(email, emailVerificationToken);

    res.status(200).send("Please verify your email");
  } catch (error) {
    res.status(401).send(`${error.message}`);
  }
};

module.exports = {
  signUp,
};
