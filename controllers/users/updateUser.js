const { updateUserScheme } = require("../../helpers/schemas/updateUserSchema");
const UserModel = require("../../models/users/users");
const { createHttpException } = require("../../helpers/createHTTPexeptions");

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = updateUserScheme.validate({ name, email, phone });
    if (error) {
      throw createHttpException(400, error.message);
    }
    const { users } = req.admin;
    const hasAdminThisUser = await users.find((user) => user === userId);
    if (hasAdminThisUser) {
      const result = await UserModel.updateUser(userId, { ...req.body });
      res.json(result);
    } else {
      res.status(203).send("Access denied");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
};
