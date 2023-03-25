const AdminModel = require("../../models/admins/admins");

const logOut = async (req, res, next) => {
  const { id } = req.admin;
  try {
    await AdminModel.findAdminByIdAndUpdate(id, {
      ...req.admin,
      sessionKey: null,
    });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logOut,
};
