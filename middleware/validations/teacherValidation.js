const { query, param, body } = require("express-validator");

// console.log(body("fullname"), typeof body("fullname"));
exports.postValidationArr = [
  body("fullname").isString().withMessage("fullname is not String"),
  body("email").isEmail().withMessage("email is not valid email"),
  //   body("image").isString().withMessage("image is not string"),
  body("password")
    .isStrongPassword()
    .withMessage("password is not strong password"),
];

exports.getSpecifiedTeacherById = [
  param("id").isMongoId().withMessage("id is not object id"),
];
exports.deleteSpecifiedTeacherById = [
  body("_id").isMongoId().withMessage("id is not object id"),
];

exports.putValidationArr = [
  body("_id").isMongoId().optional().withMessage("id is not object id"),
  body("fullname").isString().optional().withMessage("fullname is not String"),
  body("email").isEmail().optional().withMessage("email is not valid email"),
  body("image").isString().optional().withMessage("image is not string"),
  body("password")
    .isStrongPassword()
    .optional()
    .withMessage("password is not strong password"),
];

// , fullname,password, email , image (which is string)
