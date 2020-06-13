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

  res.status(200).json({
    success: true,
    data: user,
  });
});
