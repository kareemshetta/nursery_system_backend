const { query, param, body } = require("express-validator");

exports.postValidationArr = [
  // body("id").isInt().withMessage("id is not integer"),
  body("fullname").isString().withMessage("fullname is not String"),
  body("age").isInt().withMessage("age is not interger"),
  body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("level is not true"),
  body("address.city").isString().withMessage("city is not String"),
  body("address.building").isInt().withMessage("building is not Integer"),
  body("address.street").isString().withMessage("street is not String"),
];

exports.getSpecifiedChildById = [
  param("id").isInt().withMessage("id is not integer"),
];
exports.deleteSpecifiedChildById = [
  body("_id").isInt().withMessage("id is not integer"),
];

exports.putValidationArr = [
  body("_id").isInt().optional().withMessage("id is not interger"),
  // body("supervisor_id").isMongoId().withMessage("is is not mongo object"),
  body("fullname").isString().optional().withMessage("fullname is not String"),
  body("age").isInt().optional().withMessage("age is not interger"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .optional()
    .withMessage("level is not true"),
  body("address.city").isString().optional().withMessage("city is not String"),
  body("address.building")
    .isInt()
    .optional()
    .withMessage("building is not Integer"),
  body("address.street")
    .isString()
    .optional()
    .withMessage("street is not String"),
];

// , fullname,password, email , image (which is string)
