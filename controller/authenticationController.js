const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// const TeacherModel=require("../model/teacherModel")
const TeacherModel = mongoose.model("teachers");
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

exports.register = (request, response, next) => {
  const hash = bcrypt.hashSync(request.body.password, 10);
  if (request.body.role == "teacher") {
    console.log(request.file.path);
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
        const token = jwt.sign(
          {
            _id: teacherDoc._id,
            password: hash,
            email: teacherDoc.email,
            role: "teacher",
          },
          process.env.secretKey,
          { expiresIn: "1h" }
        );
        response
          .status(200)
          .json({ message: "successfully register", token: token });
      })
      .catch((err) => next(err));
  } else {
  }
};

exports.login = (request, response, next) => {
  if (request.body.role === "teacher") {
    TeacherModel.findOne({
      email: request.body.email,
      // password: hash,
    })
      .then((teacherdoc) => {
        // console.log("this data", data);
        if (!teacherdoc) {
          let error = new Error("not authenicated");
          error.statusCode = 401;
          throw error;
        }

        // console.log(
        //   "is matched",
        //   bcrypt.compareSync(request.body.password, data.password)
        // );
        // console.log(request.body.password, data.password);
        if (bcrypt.compareSync(request.body.password, teacherdoc.password)) {
          const token = jwt.sign(
            {
              _id: teacherdoc._id,
              email: teacherdoc.email,
              role: "teacher",
            },
            process.env.secretKey,
            { expiresIn: "1h" }
          );
          // let tok = jwt.verify(token, "kareem");
          // console.log(tok);
          response.status(200).json({ message: "login successfully", token });
        } else {
          let error = new Error(" you are not authenicated");
          error.statusCode = 401;
          throw error;
        }
      })
      .catch((error) => {
        next(error);
      });
  } else {
    if (request.body.role === "admin") {
      if (
        request.body.email === "admin1@gmail.com" &&
        request.body.password === "adminN_1235@nursery"
      ) {
        const token = jwt.sign(
          {
            _id: "123onlyadmin",
            password: request.body.password,
            email: request.body.email,
            role: "admin",
          },
          process.env.secretKey,
          { expiresIn: "1h" }
        );

        response.status(200).json({ message: "login successfully", token });
      } else {
        let error = new Error("not authenicated");
        error.status = 401;
        next(error);
      }
    } else {
      let error = new Error("not authenicated");
      error.status = 401;
      next(error);
    }
  }
};
