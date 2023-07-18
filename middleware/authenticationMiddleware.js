const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.secretKey);
    console.log(decodedToken);
    request.credential = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isAdminOrTeacher = (request, response, next) => {
  if (request.credential.role === "admin") {
    next();
  } else if (
    request.credential.role === "member" &&
    (request.body._id === request.credential._id ||
      request.params.id === request.credential._id)
  ) {
    next();
  } else {
    let error = new Error("you are not authorized");
    error.statusCode = 403;
    next(error);
  }
};

module.exports.isAdminOrMemebr = (request, response, next) => {
  if (request.credential.role === "admin") {
    next();
  } else {
    if (request.credential.role === "member") {
      next();
    }
  }
};

module.exports.isAdmin = (request, response, next) => {
  if (request.credential.role == "admin") {
    next();
  } else {
    let error = new Error("you are not authorized");
    error.statusCode = 403;
    next(error);
  }
};
