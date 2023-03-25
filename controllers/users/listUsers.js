const UserModel = require("../../models/users/users");
const AdminModel = require("../../models/admins/admins");

const listUsers = async (req, res, next) => {
  try {
    const { users } = req.admin;
    console.log(users);
    const isTopManager = await AdminModel.isTopManager(req.admin.id);
    if (isTopManager) {
      const result = await UserModel.listUsers();
      res.status(200).json(result);
    } else if (!isTopManager) {
      const result = await UserModel.getAdminsUsers(users);
      res.status(200).json(result);
    } else {
      res.status(403).send("Access denied");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsers,
};
