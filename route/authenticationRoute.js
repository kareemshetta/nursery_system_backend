const express = require("express");
const authController = require("../controller/authenticationController");
const validator = require("../middleware/validations/validationMw");
const authValidation = require("../middleware/validations/authenticateValidation");
const router = express.Router();
router.post(
  "/auth/login",
  authValidation.postLoginValidationArr,
  validator,
  authController.login
);

router.post(
  "/auth/register",
  authController.upload.single("image"),
  authValidation.postRegisterValidationArr,
  validator,
  authController.register
);

module.exports = router;
