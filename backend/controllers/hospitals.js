const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Hospital = require("../models/Hospital");

// @desc  Create Hospital
//@route  POST /api/v1/auth/register
//@access Private/doctors
exports.createHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.create(req.body);

  res.status(201).json({
    success: true,
    data: hospital
  })
});
