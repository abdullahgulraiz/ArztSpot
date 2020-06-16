const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


// Extract JWT auth token from header and put user into request object
exports.protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Not using cookie authentication
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exits
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route"), 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    // valid token but user not existing (probably deleted)
    if (!req.user)  throw "error";
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route"), 401);
  }
});

// Gets roles that can access the route
// if user making request does not have that
// role return forbidden (403)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`
        ),
        403
      );
    }
    next();
  };
};
