const { createHttpException } = require("../../helpers/createHTTPexeptions");
const UserModel = require("../../models/users/users");
const AdminModel = require("../../models/admins/admins");
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const isTopManager = await AdminModel.isTopManager(req.admin.id);
    if (isTopManager) {
      const result = await UserModel.getUserById(userId);
      res.status(200).json(result);
    } else {
      res.status(403).send("Access denied");
    }
  } catch (error) {
    next(createHttpException(404, "Not found"));
  }
};

module.exports = {
  getUserById,
};
