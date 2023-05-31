const mongoose = require("mongoose");

require("../model/childModel");
const Child = mongoose.model("childs");
const ClassModel = mongoose.model("class");

exports.getAllChilds = (request, response, next) => {
  //   response.status(200).json({ data: "getting all  childern data" });

  Child.find()
    .then((childDocs) => {
      if (!childDocs) {
        let error = new Error("no childs to show");
        error.statusCode = 404;
        throw error;
      } else {
        response.status(200).json(childDocs);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.addNewChild = (request, response, next) => {
  new Child({
    fullname: request.body.fullname,
    address: request.body.address,
    level: request.body.level,
  })
    .save()
    .then((childDoc) => {
      if (!childDoc) {
        let error = new Error("can't add this child check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(childDoc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateChild = (request, response, next) => {
  ClassModel.findOne({ children: request.body._id }, { supervisor: 1 }).then(
    (classDoc) => {
      if (!classDoc) {
        let error = new Error("child id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      console.log(classDoc);
      console.log(classDoc.supervisor, request.credential._id);

      if (classDoc.supervisor == request.credential._id) {
        Child.updateOne({ _id: request.body._id }, request.body)
          .then((doc) => {
            if (doc.matchedCount == 0) {
              let error = new Error(" child id doesn't exist");
              error.statusCode = 404;
              throw error;
            }
            response
              .status(201)
              .json({ message: "child updated successfully" });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        let error = new Error("you are not authorized");
        error.statusCode = 403;
        next(error);
      }
    }
  );
};

exports.deleteChild = (request, response, next) => {
  Child.deleteOne({ _id: request.body._id })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error("this child doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ message: " child is deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getChildById = (request, response, next) => {
  Child.findById(request.params.id)
    .then((doc) => {
      if (!doc) {
        let error = new Error("this child doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(doc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getChildClass = (request, response, next) => {
  ClassModel.findOne({ children: request.params.id }, { name: 1 })
    .then((doc) => {
      if (!doc) {
        let error = new Error("this child doesn't exist so there is no class");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(doc);
    })
    .catch((err) => next(err));
};
