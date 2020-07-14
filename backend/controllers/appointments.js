const Appointment = require("../models/Appointment");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

// @desc  Create new appointment
//@route  POST /api/v1/appointments
//@access Private/patient
//@access Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  let appointment;
  const { hospitalId, doctorId, userId, startTime, finishTime } = req.body;
  const user = await User.findById(userId);
  // find the doctor that works in the given hospital
  const doctor = await User.findOne({ hospital: hospitalId, _id: doctorId });
  if (!doctor) {
    return next(
      new ErrorResponse(
        `Doctor not found working in hospital with id of ${hospitalId}`,
        404
      )
    );
  }
  // this is unlikely to happen since the route is protected, but the user may have been deleted (race condition)
  if (!user) {
    return next(new ErrorResponse(`User not found  with id of ${userId}`, 404));
  }
  // check that there are no search
  // for that doctor in the given time window
  appointment = await Appointment.findOne({
    hospital: hospitalId,
    doctor: doctorId,
    user: user,
    startTime: startTime ,
    finishTime: finishTime
  });
  if (appointment) {
    return next(new ErrorResponse(`Appointment already exists`, 400));
  }
  appointment = await Appointment.create({
    hospital: hospitalId,
    user: user,
    doctor: doctorId,
    startTime: startTime,
    finishTime: finishTime,
  });
  res.status(200).json({ success: true, appointment });
});

// @desc  Get Appointments for a given Doctor
//@route  GET /api/v1/appointments/doctors/:doctorId
//@access Public
exports.getAppointmentForDoctor = asyncHandler(async (req, res, next) => {
  const { startTime, finishTime } = req.body;
  const { doctorId, hospitalId } = req.params;
  let appointment;
  // find the doctor that works in the given hospital
  const doctor = await User.findOne({ hospital: hospitalId, _id: doctorId });
  if (!doctor) {
    return next(
      new ErrorResponse(
        `Doctor not found working in hospital with id of ${hospitalId}`,
        404
      )
    );
  }
  // TODO: Add validation is the appointment starting at :00 or :30
  if (startTime && finishTime) {
    appointment = await Appointment.findOne({
      hospital: hospitalId,
      doctor: doctorId,
      startTime: startTime,
      finishTime: finishTime,
    });
  } else {
    appointment = await Appointment.find({
      hospital: hospitalId,
      doctor: doctorId,
    });
  }

  // if the appointment does not exist it will return null
  res.status(200).json({ success: true, appointment });
});

// @desc  Get Appointment for the user making the request (either doctor or patient)
//@route  GET /api/v1/appointments
//@access Private
exports.getAppointmentForUser = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filterResults);
});

// @desc  Get Appointment by appointmentId
//@route  GET /api/v1/appointments/:id
//@access Private
exports.getAppointmentById = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that dashboard should have access to it
  if (
    appointment.doctor.toString() !== req.user.id &&
    appointment.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`You are not authorized to see this appointment`, 401)
    );
  }
  res.status(200).json({ success: true, appointment });
});

// @desc  Update Appointment
//@route  PUT /api/v1/appointments/:id
//@access Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  let appointment;
  appointment = await Appointment.findById(req.params.id);
  const { startTime, finishTime } = req.body;
  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that dashboard should have access
  if (
    appointment.doctor.toString() !== req.user.id &&
    appointment.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `You are not authorized to update this appointment`,
        401
      )
    );
  }
  // check that there are no clashing appointments
  // for that doctor in the given time window
  const clashingAppointments = await Appointment.find({
    hospital: appointment.hospital,
    doctor: appointment.doctor,
    ...findClashQuery(startTime, finishTime),
  });
  if (clashingAppointments.length > 0) {
    return next(
      new ErrorResponse(`Appointment already exists in that time slot`, 400)
    );
  }
  // update dashboard
  // do not use findByIdAndUpdate since
  // custom validators do not have access to `this`
  appointment.startTime = startTime;
  appointment.finishTime = finishTime;
  await appointment.save();
  res.status(200).json({ success: true, appointment });
});

// @desc  Delete Appointment
//@route  DELETE /api/v1/appointments/:id
//@access Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that dashboard should have access
  if (
    appointment.doctor.toString() !== req.user.id &&
    appointment.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `You are not authorized to delete this appointment`,
        401
      )
    );
  }
  await appointment.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

const findClashQuery = (startTime, finishTime) => {
  // Check three cases:
  // 1) Is start time of new dashboard between existing search?
  // 2) Is finish time of new dashboard between existing search?
  // 3) Is there any event between the new start time and finish time?
  const query = {
    $or: [
      {
        $and: [
          {
            startTime: {
              $lt: startTime,
            },
          },
          {
            finishTime: {
              $gt: startTime,
            },
          },
        ],
      },
      {
        $and: [
          {
            startTime: {
              $lt: finishTime,
            },
          },
          {
            finishTime: {
              $gt: finishTime,
            },
          },
        ],
      },
      {
        $and: [
          {
            startTime: {
              $gte: startTime,
            },
          },
          {
            finishTime: {
              $lte: finishTime,
            },
          },
        ],
      },
    ],
  };
  return query;
};
