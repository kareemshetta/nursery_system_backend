const express = require("express");
const validation = require("../middleware/validations/teacherValidation");
const validator = require("../middleware/validations/validationMw");
const authMiddleWare = require("../middleware/authenticationMiddleware");
const teacherController = require("../controller/teacherController");
const router = express.Router();

router
  .route("/teachers")
  .all(authMiddleWare.isAdminOrTeacher)
  .get(teacherController.getAllTeacher)
  .post(
    teacherController.upload.single("image"),
    validation.postValidationArr,
    validator,
    teacherController.addNewTeacher
  )
  .patch(
    teacherController.updateTeacher,
    validator,
    validation.putValidationArr
  )
  .delete(
    teacherController.deleteTeacher,
    validation.deleteSpecifiedTeacherById,
    validator
  );

router.get(
  "/teachers/supervise",
  authMiddleWare.isAdminOrTeacher,
  teacherController.getAllSupervisor
);

router.get(
  "/teachers/:id",
  authMiddleWare.isAdminOrTeacher,
  validation.getSpecifiedTeacherById,
  validator,
  teacherController.getTeacherById
);

module.exports = router;
