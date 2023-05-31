const { body } = require("express-validator");

exports.postLoginValidationArr = [
  body("email").isEmail().withMessage("email is not valid email"),

  body("password")
    .isStrongPassword()
    .withMessage("password is not strong password"),
  body("role").isString().withMessage("role must be string"),
];

exports.postRegisterValidationArr = [
  body("fullname").isString().withMessage("fullname is not String"),
  body("email").isEmail().withMessage("email is not valid email"),
  // body("image").isString().withMessage("image is not string"),
  body("password")
    .isStrongPassword()
    .withMessage("password is not strong password"),
];
