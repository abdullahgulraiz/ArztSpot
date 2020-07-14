const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

// @desc  Get all doctors
//@route  GET /api/v1/doctors
//@access Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filterResults);
});

// @desc  Get single doctor
//@route  GET /api/v1/doctors/:id
//@access Public
exports.getDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await User.findById({
    role: "doctor",
    _id: req.params.id,
  }).populate("hospital");

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: doctor });
});

// @desc  Add doctor to Hospital
//@route  POST /api/v1/hospitals/:hospitalId/doctors
//@access Private
exports.addDoctorToHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.hospitalId);
  let doctor = await User.find({ email: req.params.email });
  if (!hospital) {
    return next(
      new ErrorResponse(
        `Hospital not found with id of ${req.params.hospitalId}`,
        404
      )
    );
  }
  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor with email ${req.params.email} not found`, 404)
    );
  }
  // Check if user is hospital owner and not an admin
  if (hospital.owner.toString() !== req.user.id && req.user.role !== "admin") {
    next(
      new ErrorResponse(
        `You cannot add doctors to this hospital. Contact hospital owner`,
        401
      )
    );
  }
  doctor = await User.findOneAndUpdate(
    { email: req.body.email },
    { hospital },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: doctor });
});
