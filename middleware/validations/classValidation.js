const { query, param, body } = require("express-validator");

exports.postValidationArr = [
  body("name").isString().withMessage("name is not String"),
  body("supervisor").isMongoId().withMessage("supervisor is valid  id"),
  body("children")
    .isArray()
    .withMessage("children is not array")
    .custom((value) => {
      if (!value.every(Number.isInteger))
        throw new Error("children ids must be all integer"); // check that contains Integers
      return true;
    }),
];

exports.getSpecifiedclassById = [
  param("id").isInt().withMessage("id is integer"),
];
exports.deleteSpecifiedClassById = [
  body("id").isInt().withMessage("id is integer"),
];

exports.getSpecifiedClassSupervisorById = [
  param("id").isMongoId().withMessage("supervisor id is not valid id"),
];

exports.putValidationArr = [
  body("_id").isInt().withMessage("id is integer"),
  body("name").isString().optional().withMessage("name is not String"),
  body("supervisor")
    .isMongoId()
    .optional()
    .withMessage("supervisor is valid  id"),
  body("children")
    .isArray()
    .optional()
    .withMessage("children is not array")
    .custom((value) => {
      if (!value.every(Number.isInteger))
        throw new Error("children ids must be all integer"); // check that contains Integers
      return true;
    }),
];

// , fullname,password, email , image (which is string)
