const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Hospital = require("../models/Hospital");

// @desc  Create Hospital
//@route  POST /api/v1/hospitals
//@access Private/doctors
exports.createHospital = asyncHandler(async (req, res, next) => {
  // add owner to body
  req.body.owner = req.user.id
  const hospital = await Hospital.create(req.body);

  res.status(201).json({
    success: true,
    data: hospital
  })
});

// @desc  Get all Hospitals
//@route  POST /api/v1/auth/register
//@access Public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  const hospitals = await Hospital.find()

  res.status(201).json({
    success: true,
    data: hospitals
  })
});