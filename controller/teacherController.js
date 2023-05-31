const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
require("../model/teacherModel");

const TeacherModel = mongoose.model("teachers");
const ClassModel = mongoose.model("class");

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (request, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "_") + file.originalname);
    // console.log(file);
  },
});
const filter = (request, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
    // console.log(true);
    console.log(file);
  } else {
    //if u want to throw error if file type doesn'match
    // cb(new Error("file type doesn't match"),false);
    cb(null, false);
  }
};

exports.upload = multer({
  storage: storage,
  createDestination: true,
  limits: { fieldSize: 1024 * 1024 * 5 },
  fileFilter: filter,
});

exports.getAllTeacher = (request, response, next) => {
  //   response.status(200).json({ data: "getting all teacher data" });
  TeacherModel.find({})
    .then((teacherDocs) => {
      if (!teacherDocs) {
        response.status(200).json({ message: "no teachers to show" });
      }
      response.status(200).json(teacherDocs);
    })
    .catch((err) => {
      next(err);
    });
};

exports.addNewTeacher = (request, response, next) => {
  console.log(request.file.path);
  const hash = bcrypt.hashSync(request.body.password, 10);
  request.body.image = request.file.path;
  new TeacherModel({
    fullname: request.body.fullname,
    password: hash,
    email: request.body.email,
    image: request.file.path,
  })
    .save()
    .then((teacherDoc) => {
      if (!teacherDoc) {
        const error = new Error("can't add teacher check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(teacherDoc);
    })
    .catch((err) => next(err));
};

exports.updateTeacher = (request, response, next) => {
  TeacherModel.updateOne({ _id: request.body._id }, request.body)
    .then((data) => {
      if (data.matchedCount === 0) {
        let error = new Error(" teacher id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteTeacher = (request, response, next) => {
  TeacherModel.deleteOne({ _id: request.body._id })
    .then((doc) => {
      if (doc.deletedCount === 0) {
        let error = new Error("this teacher id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ message: " teacher deleted successfully" });
    })
    .catch((err) => next(err));
};

exports.getTeacherById = (request, response, next) => {
  TeacherModel.findOne({ _id: request.params.id })
    .then((classDoc) => {
      if (!classDoc) {
        let error = new Error("this teacher id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(classDoc);
    })
    .catch((err) => next(err));
};

exports.getAllSupervisor = (request, response, next) => {
  ClassModel.find({}, { supervisor: 1, name: 1 })
    .populate("supervisor", { fullname: 1, email: 1 })
    .then((doc) => {
      if (!doc) {
        let error = new Error("no data to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(doc);
    })
    .catch((err) => next(err));
};
