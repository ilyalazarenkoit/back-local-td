const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/index");
const { authAdmin } = require("../../middlewares/auth-admin.middleware");
const { validation } = require("../../middlewares/validation.middleware");
const adminController = require("../../controllers/admin/index");
const {
  reSendEmailValidation,
} = require("../../middlewares/reSendEmailValidation");

module.exports = router;

router.post("/register", validation, authController.signUp);
router.post("/login", validation, authController.signIn);
router.post("/logout", authAdmin, authController.logOut);
router.get(
  "/email/verify/:emailVerificationToken",
  adminController.emailVerification
);
router.post(
  "/email/reverify",
  reSendEmailValidation,
  adminController.reSendVerificationMail
);
