const express = require("express");
const usersController = require("../../controllers/users");
const router = express.Router();
const { authAdmin } = require("../../middlewares/auth-admin.middleware");

router.get("/", authAdmin, usersController.listUsers);

router.get("/:userId", authAdmin, usersController.getUserById);

router.post("/", authAdmin, usersController.addUser);

router.delete("/:userId", authAdmin, usersController.removeUser);

router.put("/:userId", authAdmin, usersController.updateUser);

module.exports = router;
