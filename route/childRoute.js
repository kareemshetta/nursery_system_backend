const express = require("express");
const childController = require("../controller/childController");
const validation = require("../middleware/validations/childValidation");
const validator = require("../middleware/validations/validationMw");
const authMiddleWare = require("../middleware/authenticationMiddleware");
const router = express.Router();

router
  .route("/childs")
  .get(authMiddleWare.isAdmin, childController.getAllChilds)
  .post(
    authMiddleWare.isAdmin,
    validation.postValidationArr,
    validator,
    childController.addNewChild
  )
  .patch(
    authMiddleWare.isAdminOrTeacher,
    validation.putValidationArr,
    validator,
    childController.updateChild
  )
  .delete(
    authMiddleWare.isAdmin,
    validation.deleteSpecifiedChildById,
    validator,
    childController.deleteChild
  );

router.get(
  "/childs/:id",
  authMiddleWare.isAdmin,
  validation.getSpecifiedChildById,
  validator,
  childController.getChildById
);
router.get(
  "/childs/:id/class",
  authMiddleWare.isAdmin,
  validation.getSpecifiedChildById,
  validator,
  childController.getChildClass
);
module.exports = router;
