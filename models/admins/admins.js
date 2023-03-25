const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const adminsPath = path.join(__dirname, "admins.json");
const { createHttpException } = require("../../helpers/createHTTPexeptions");

const updateAdminList = async (admins) =>
  await fsp.writeFile(adminsPath, JSON.stringify(admins, null, 2));

const listAdmins = async () => {
  const unparsedAdmins = await fsp.readFile(adminsPath, "utf8");
  const admins = JSON.parse(unparsedAdmins);
  return admins;
};

const findAdminByArg = async (query) => {
  const admins = await listAdmins();
  const admin = await admins.find((admin) =>
    Object.keys(query).every((key) => admin[key] === query[key])
  );

  return admin;
};

const createNewAdmin = async (newAdmin) => {
  const admins = await listAdmins();
  const admin = {
    id: nanoid(),
    ...newAdmin,
  };
  admins.push(admin);
  await updateAdminList(admins);
  return admin;
};

const findAdminByIdAndUpdate = async (id, body) => {
  const admins = await listAdmins();
  const index = admins.findIndex((admin) => admin.id === id);
  if (index === -1) {
    throw createHttpException(404, "The user is not found");
  }
  admins[index] = { ...body };
  await updateAdminList(admins);
  return admins[index];
};
const addUserToAdmin = async (adminId, userId) => {
  try {
    const admins = await listAdmins();
    const index = admins.findIndex((admin) => admin.id === adminId);
    if (index === -1) {
      throw createHttpException(404, "The admin is not found");
    }
    admins[index].users.push(userId);
    await updateAdminList(admins);
    return admins[index];
  } catch (error) {
    throw createHttpException(404, "Invalid request");
  }
};
const isTopManager = async (adminId) => {
  try {
    const admins = await listAdmins();
    const index = admins.findIndex(
      (admin) => admin.id === adminId && admin.role === "top-manager"
    );
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw createHttpException(404, "Invalid request");
  }
};

module.exports = {
  findAdminByIdAndUpdate,
  findAdminByArg,
  createNewAdmin,
  addUserToAdmin,
  isTopManager,
};
