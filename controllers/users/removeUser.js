const UserModel = require("../../models/users/users");
const AdminModel = require("../../models/admins/admins");
const removeUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { users, id } = req.admin;
    const hasAdminThisUser = await users.find((user) => user === userId);
    if (hasAdminThisUser) {
      await UserModel.removeUser(userId);
      const newListOfUsers = await users.filter((index) => index !== userId);
      await AdminModel.findAdminByIdAndUpdate(id, {
        ...req.admin,
        users: newListOfUsers,
      });
    }

    res.status(204).send("User has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  removeUser,
};
