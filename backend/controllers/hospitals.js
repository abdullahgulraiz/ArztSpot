const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Hospital = require("../models/Hospital");

// @desc  Create Hospital
//@route  POST /api/v1/hospitals
//@access Private/doctors
exports.createHospital = asyncHandler(async (req, res, next) => {
  // add owner to body
  req.body.owner = req.user.id;
  const hospital = await Hospital.create(req.body);

  res.status(201).json({
    success: true,
    data: hospital,
  });
});

// @desc  Get all Hospitals
//@route  GET /api/v1/hospitals
//@access Public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filterResults);
});

// @desc  Get single Hospital
//@route  GET /api/v1/hospitals/:id
//@access Public
exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id).populate("doctors");
  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// @desc  Update Hospital
//@route  PUT /api/v1/hospitals/:id
//@access Private
exports.updateHospital = asyncHandler(async (req, res, next) => {
  let hospital = await Hospital.findById(req.params.id);
  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is hospital owner
  if (hospital.owner.toString() !== req.user.id && req.user.role !== "admin") {
    next(
      new ErrorResponse(
        `User is not authorized to update ${req.user.id} this hospital`,
        401
      )
    );
  }
  // only update these fields
  const { name, phone, is_private_practice } = req.body;
  hospital = await Hospital.findByIdAndUpdate(
    req.params.id,
    { name, phone, is_private_practice },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// @desc  Delete Hospital
//@route  DELETE /api/v1/hospitals/:id
//@access Private
exports.deleteHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);
  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is hospital owner
  if (hospital.owner.toString() !== req.user.id && req.user.role !== "admin") {
    next(
      new ErrorResponse(
        `User is not authorized to delete ${req.user.id} this hospital`,
        401
      )
    );
  }
  await hospital.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
