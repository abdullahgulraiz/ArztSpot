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
  const doctors = await User.find({ role: "doctor", _id: req.params.id });
  res.status(200).json({ success: true, data: doctors });
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

// @desc Get Doctors within a radius (from user address)
// @route GET /api/v1/doctors/search/:distance
//@access Private
// exports.getDoctorsWithinRadius = asyncHandler(async (req, res, next) => {
//   const { distance } = req.params;
//   const lng = req.user.address_geojson.coordinates[0];
//   const lat = req.user.address_geojson.coordinates[1];
//
//   // Calc radius using radians
//   // Divide dist by radius of Earth
//   // Earth Radius = 3,963 mi / 6,378 km
//   const radius = distance / 6378;
//   const hospitals = await Hospital.find({
//     address_geojson: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//   });
//   // find doctors that work in the hospitals found
//   let doctors = [];
//   // for (const hospital of hospitals) {
//   //   const foundDoctors = await User.find({
//   //     role: "doctor",
//   //     hospital,
//   //     specialization: "traumatology"
//   //   });
//   //   doctors.push(foundDoctors);
//   // }
//   doctors = await User.find({
//     role: "doctor",
//     hospital: { $in: hospitals}
//   })
//
//
//   // console.log(hospitals)
//   res.status(200).json({
//     success: true,
//     data: doctors,
//   });
// });
