const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  // console.log(request.param("id"));

  let result = validationResult(request);

  if (result.errors.length != 0) {
    let errorMessage = result.errors.reduce(
      (current, object) => current + object.msg + ",",
      ""
    );

    let error = new Error(errorMessage);
    error.statusCode = 442;
    console.log(error + "");
    throw error;
  }
  next();
};
