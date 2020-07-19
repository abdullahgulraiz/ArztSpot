const moment = require("moment");
const Appointment = require("../models/Appointment");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Symptom = require("../models/Symptom");
const sendEmail = require("../utils/sendEmail");

// @desc  Create new appointment
//@route  POST /api/v1/appointments
//@access Private/patient
//@access Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  let appointment;
  const {
    hospitalId,
    doctorId,
    userId,
    startTime,
    finishTime,
    symptoms,
  } = req.body;
  const user = await User.findById(userId);
  // find the doctor that works in the given hospital
  const doctor = await User.findOne({
    hospital: hospitalId,
    _id: doctorId,
  }).populate("hospital");
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
    startTime: startTime,
    finishTime: finishTime,
  });
  if (appointment) {
    return next(new ErrorResponse(`Appointment already exists`, 400));
  }
  // get symptom ids of each symptom
  let symptomIds = [];
  for (const symptom_ of symptoms) {
    let symptom = await Symptom.findOne({ name: { $regex : new RegExp(symptom_, "i") } });
    if (symptom) {
      symptomIds.push(symptom._id.toString());
    } else {
      symptom = await Symptom.create({
        name: symptom_,
      });
      symptomIds.push(symptom._id.toString());
    }
  }
  // create appointment
  appointment = await Appointment.create({
    hospital: hospitalId,
    doctor: doctorId,
    user: userId,
    startTime: startTime,
    finishTime: finishTime,
    symptoms: symptomIds,
  });
  // notify user
  const message = `
  Dear ${user.firstname} ${user.lastname},
  
  You have booked an appointment with ${doctor.firstname} ${
    doctor.lastname
  }, on ${moment(appointment.startTime).format("YYYY-MM-DD kk:mm")}.
  As a friendly remainder, the address of the consultation room is ${
    doctor.hospital.address_geojson.formattedAddress
  }.
  
  Best regards,
  The ArztSpot Team
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: `You have a new appointment with Dr. ${doctor.lastname}`,
      message,
    });
    return res.status(200).json({ success: true, appointment, email: "Sent" });
  } catch (err) {
    // could not send email but appointment was created
    return res
      .status(200)
      .json({ success: true, appointment, email: "Not sent" });
  }
});

// @desc  Get Appointments for a given Doctor
//@route  GET /api/v1/appointments/:hospitalId/:doctorId
//@access Public
exports.getAppointmentForDoctor = asyncHandler(async (req, res, next) => {
  const { doctorId, hospitalId } = req.params;
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
  const appointment = await Appointment.find({
    hospital: hospitalId,
    doctor: doctorId,
  });

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
  appointment = await Appointment.findById(req.params.id)
    .populate("doctor")
    .populate("hospital");
  const oldTime = appointment.startTime;
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
    hospital: appointment.hospital._id,
    doctor: appointment.doctor._id,
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
  // notify user
  const message = `
  Dear ${req.user.firstname} ${req.user.lastname},
  
  You have updated an appointment with ${appointment.doctor.firstname} ${
    appointment.doctor.lastname
  }, from ${moment(oldTime).format("YYYY-MM-DD kk:mm")} to ${moment(
    appointment.startTime
  ).format("YYYY-MM-DD kk:mm")}.
  As a friendly remainder, the address of the consultation room is ${
    appointment.hospital.address_geojson.formattedAddress
  }.
  
  Best regards,
  The ArztSpot Team
  `;
  try {
    await sendEmail({
      email: req.user.email,
      subject: `You have updated your appointment with Dr. ${appointment.doctor.lastname}`,
      message,
    });
    return res.status(200).json({ success: true, appointment, email: "Sent" });
  } catch (err) {
    // could not send email but appointment was updated
    return res
      .status(200)
      .json({ success: true, appointment, email: "Not sent" });
  }
});

// @desc  Delete Appointment
//@route  DELETE /api/v1/appointments/:id
//@access Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "doctor"
  );
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
  // take some values for email sending
  const { startTime, doctor } = appointment;
  await appointment.remove();
  // notify user
  const message = `
  Dear ${req.user.firstname} ${req.user.lastname},
  
  You have canceled an appointment with ${appointment.doctor.firstname} ${
    appointment.doctor.lastname
  } on ${moment(startTime).format("YYYY-MM-DD kk:mm")}.
  Please contact us with you think this is a mistake.
  
  Best regards,
  The ArztSpot Team
  `;
  // notify doctor also
  const messageDoctor = `
  Dear Dr. ${appointment.doctor.lastname},
  
  Your patient ${req.user.firstname} ${
    req.user.lastname
  } have canceled their appointment on ${moment(startTime).format(
    "YYYY-MM-DD kk:mm"
  )}.
  
  Best regards,
  The ArztSpot Team
  `;
  try {
    // this should be done in parallel
    await Promise.all([
      sendEmail({
        email: req.user.email,
        subject: `Canceled appointment with ${appointment.doctor.firstname}`,
        message,
      }),
      sendEmail({
        email: doctor.email,
        subject: "Deleted appointment",
        message: messageDoctor,
      }),
    ]);
    return res.status(200).json({ success: true, data: {}, email: "Sent" });
  } catch (err) {
    // could not send email but appointment was deleted
    return res.status(200).json({ success: true, data: {}, email: "Not sent" });
  }
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
