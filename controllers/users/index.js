const { addUser } = require("./addUser");
const { listUsers } = require("./listUsers");
const { removeUser } = require("./removeUser");
const { updateUser } = require("./updateUser");
const { getUserById } = require("./getUserById");

module.exports = {
  addUser,
  listUsers,
  removeUser,
  updateUser,
  getUserById,
};
