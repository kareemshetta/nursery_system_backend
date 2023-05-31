const express = require("express");
const classController = require("../controller/classController");
const validation = require("../middleware/validations/classValidation");
const validator = require("../middleware/validations/validationMw");
const authMiddleWare = require("../middleware/authenticationMiddleware");
const router = express.Router();

router
  .route("/class")
  .all(authMiddleWare.isAdmin)
  .get(classController.getAllClass)
  .post(validation.postValidationArr, validator, classController.addNewClass)
  .patch(validation.putValidationArr, validator, classController.updateClass)
  .delete(validation.deleteSpecifiedClassById, classController.deleteClass);

router.get(
  "/class/:id",authMiddleWare.isAdmin,
  validation.getSpecifiedclassById,
  validator,
  classController.getClassById
);

router.get(
  "/class/:id/child",
  validation.getSpecifiedclassById,
  validator,
  classController.getclassChildern
);
router.get(
  "/class/:id/teacher",
  validation.getSpecifiedclassById,
  validator,
  classController.getclassTeacher
);
module.exports = router;
