const { createHttpException } = require("../../helpers/createHTTPexeptions");
const { addUserScheme } = require("../../helpers/schemas/addUserScheme");
const UserModel = require("../../models/users/users");
const AdminModel = require("../../models/admins/admins");

const addUser = async (req, res, next) => {
  try {
    const { error } = await addUserScheme.validate(req.body);

    if (error) {
      throw createHttpException(400, error.message);
    }
    const newUser = await UserModel.addNewUser(req.body);
    await AdminModel.addUserToAdmin(req.admin.id, newUser.id);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
};
