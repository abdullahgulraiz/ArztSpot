const Appointment = require("../models/Appointment");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

// @desc  Create new appointment
//@route  POST /api/v1/appointment
//@access Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  let appointment;
  const { hospitalId, doctorId, startTime, finishTime } = req.body;
  // find the doctor that works in the given hospital
  const doctor = await User.findOne({ hospital: hospitalId, _id: doctorId });
  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${hospitalId}`, 404));
  }
  // check that there are no appointments
  // for that doctor in the given time window
  appointment = await Appointment.findOne({
    hospital: hospitalId,
    doctor: doctorId,
    startTime: { $gte: startTime},
    finishTime: {$lte: finishTime}
  })
  if(appointment) {
    return next(new ErrorResponse(`Appointment already exists`, 400));
  }
  appointment = await Appointment.create({
    hospital: hospitalId,
    doctor: doctorId,
    startTime: startTime,
    finishTime: finishTime,
  });
  res.status(200).json({ success: true, appointment });
});


// @desc  Get single Appointment
//@route  GET /api/v1/appointment/:id
//@access Public
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
  res.status(200).json(res.filterResults);
});
