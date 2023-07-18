const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const classRouter = require("./route/classRoute");
const childRouter = require("./route/childRoute");
const teacherRouter = require("./route/teacherRoute");
const authRouter = require("./route/authenticationRoute");
const authMiddleWare = require("./middleware/authenticationMiddleware");

dotenv.config();
const server = express();
let port = process.env.PORT || 3000;
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("db connected");
    server.listen(port, () => {
      console.log("express is listening");
      console.log(port);
    });
  })
  .catch((err) => {
    console.log("db error" + err.message);
  });

server.use("/uploads", express.static("./uploads"));
server.use(morgan("dev"));
// server.use(express.json(), express.urlencoded({ extended: true }));
server.use(express.json());
server.use(authRouter);
// authentication middleware for protecting route
server.use(authMiddleWare);
server.use(childRouter);
server.use(classRouter);
server.use(teacherRouter);

server.use((request, response, next) => {
  response.status(404).json({ message: "page doesn't exist" });
});

server.use((error, request, response, next) => {
  // response.status(error.status).json({ error: error.message });
  console.log(error.stack);
  response.status(error.statusCode || 500).json({ error: error.message });
});
