const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const usersPath = path.join(__dirname, "users.json");
const { createHttpException } = require("../../helpers/createHTTPexeptions");

const updateUserList = async (users) =>
  await fsp.writeFile(usersPath, JSON.stringify(users, null, 2));

const listUsers = async () => {
  const unparsedUsers = await fsp.readFile(usersPath, "utf8");
  const users = JSON.parse(unparsedUsers);
  return users;
};

const getAdminsUsers = async (usersIds) => {
  const users = await listUsers();
  return users.filter((user) => usersIds.includes(`${user.id}`));
};

const getUserById = async (userId) => {
  const users = await listUsers();
  const user = await users.find((user) => `${user.id}` === userId);
  if (!user) {
    throw createHttpException(404, "The user is not found");
  }
  return user;
};

const removeUser = async (userId) => {
  const users = await listUsers();
  const index = users.findIndex((user) => `${user.id}` === userId);
  if (index === -1) {
    throw createHttpException(404, "The user is not found");
  }
  users.splice(index, 1);
  await updateUserList(users);
  return users[index];
};

const addNewUser = async (newUser) => {
  const users = await listUsers();
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    throw createHttpException(400, "User with this email already exists");
  }
  const user = {
    id: nanoid(),
    ...newUser,
  };
  users.push(user);
  await updateUserList(users);
  return user;
};

const updateUser = async (userId, body) => {
  const users = await listUsers();
  const index = users.findIndex((user) => `${user.id}` === userId);
  if (index === -1) {
    throw createHttpException(404, "The user is not found");
  }
  users[index] = { ...users[index], ...body };
  await updateUserList(users);
  return users[index];
};

module.exports = {
  listUsers,
  getUserById,
  removeUser,
  addNewUser,
  updateUser,
  getAdminsUsers,
};
