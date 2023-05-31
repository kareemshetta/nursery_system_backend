const mongoose = require("mongoose");

require("../model/classModel");

const ClassModel = mongoose.model("class");
// const ChildModel = mongoose.model("child");
exports.getAllClass = (request, response, next) => {
  ClassModel.find()
    .then((classDocs) => {
      if (!classDocs) {
        let error = new Error("no classes to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(classDocs);
    })
    .catch((err) => {
      next(err);
    });
};

exports.addNewClass = (request, response, next) => {
  new ClassModel(request.body)
    .save()
    .then((classDoc) => {
      // check if classDoc is null
      if (!classDoc) {
        let error = new Error("can't add this class check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json(classDoc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateClass = (request, response, next) => {
  ClassModel.updateOne({ _id: request.body._id }, request.body)
    .then((data) => {
      //   console.log(data);
      if (data.matchedCount === 0) {
        let error = new Error(" class id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

// exports.updateClass = (request, response, next) => {
//   response.status(200).json({ data: "update newclassr" });
// };

exports.deleteClass = (request, response, next) => {
  ClassModel.deleteOne({ _id: request.body._id })
    .then((doc) => {
      if (doc.deletedCount === 0) {
        let error = new Error("this class doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ message: " class deleted successfully" });
    })
    .catch((err) => next(err));
};

exports.getClassById = (request, response, next) => {
  console.log("fcfccc");
  ClassModel.findOne({ _id: request.params.id })
    .then((classDoc) => {
      if (!classDoc) {
        let error = new Error("this class doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(classDoc);
    })
    .catch((err) => next(err));
};

exports.getclassChildern = (request, response, next) => {
  console.log(request.params.id);
  ClassModel.findOne({ _id: request.params.id }, { children: 1 })
    .populate("children", {
      fullname: 1,
      address: 1,
    })
    .then((docs) => {
      if (!docs) {
        let error = new Error("no data for children to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(docs);
    })
    .catch((err) => next(err));
};

exports.getclassTeacher = (request, response, next) => {
  ClassModel.findOne(
    { _id: request.params.id },
    { supervisor: 1, name: 1, _id: 1 }
  )
    .populate("supervisor", {
      fullname: 1,
      email: 1,
    })
    .then((docs) => {
      if (!docs) {
        let error = new Error("no data for teacher");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(docs);
    })
    .catch((err) => next(err));
};
