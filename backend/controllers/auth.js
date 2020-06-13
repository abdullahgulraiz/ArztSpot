const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc  Register user
//@route  POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password, role, experience } = req.body;

  // Create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    role,
    experience,
  });

  sendTokenResponse(user, 200, res);
});

// @desc  Login user
//@route  POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  // Check for user
  // password is not returned by default then add it with `select`
  const user = await User.findOne({ email }).select("+password");

  // Important: Use same error for no user in db and incorrect password
  // for security reasons.
  // 401: Unauthorized
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if entered password is correct
  const isPassword = await user.matchPassword(password);

  if (!isPassword) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc  Update user details (
//@route  PUT /api/v1/auth/details
//@access Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const toUpdate = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    experience: req.body.experience
  }
  // Only update fields which come in the request.
  Object.keys(toUpdate).forEach(key => {
    if (toUpdate[key] === undefined) {
      delete toUpdate[key];
    }
  });
  console.log(toUpdate)
  if (Object.entries(toUpdate).length === 0) {
    return next(new ErrorResponse('Invalid update request', 400))
  }

  const user = await User.findByIdAndUpdate(req.user.id, toUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});


// @desc  Update password
//@route  PUT /api/v1/auth/password
//@access Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});




// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getJwtToken();

  // set expire date in msec
  // httpOnly: cookie only accessible through client side script
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // secure flag to send cookie through https
  // only in production mode
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
