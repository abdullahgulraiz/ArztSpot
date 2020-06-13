const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  // copy object
  let error = { ...err };

  error.message = err.message;

  // Bad ObjectId. Error happens when
  // id used is not formatted correctly
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Error code: Moongose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Error thrown by moongose when validating fields
  // Ex: email is not formatted correctly
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
