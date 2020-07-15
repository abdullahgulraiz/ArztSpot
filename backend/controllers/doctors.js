const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Appointment = require("../models/Appointment");

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

// @desc  Get all patients associated with a single doctor
//@route  POST /api/v1/doctors/mypatients
//@access Public
exports.getDoctorPatients = asyncHandler(async (req, res, next) => {
  const { searchCriteria, searchValue } = req.body;
  const validSearchCriterias = ["firstname", "lastname", "birthday", undefined];
  if (!validSearchCriterias.includes(searchCriteria)) {
    return next(
        new ErrorResponse(
            `Invalid search criteria ${searchCriteria}.`,
            404
        )
    );
  }
  // get patient ids based on appointments
  let patientIds = {};
  const appointments = await Appointment.find({doctor: req.user._id.toString()}).sort('startTime');
  // store patient Ids and their latest appointments in a dictionary
  appointments.map(appt => {
    patientIds[appt.user.toString()] = appt.startTime;
  });
  // get user objects which belong to the doctor, filtered further with the criteria if needed
  let query = { role: "user" };
  if (searchCriteria) {
    if (searchValue) {
      query[searchCriteria] = searchValue;
    } else {
      return next(
          new ErrorResponse(
              `Invalid search query for ${searchCriteria}.`,
              404
          )
      );
    }
  }
  let patients = await User
      .find(query)
      .where('_id').in(Object.keys(patientIds))
      .lean();
  // add a custom property of patient's latest Appointment to the results
  patients = patients.map(p => {
    p.lastAppointment = patientIds[p._id.toString()];
    return p;
  });
  res.status(200).json({ success: true, data: patients });
});

// @desc  Get single patient associated with a single doctor
//@route  POST /api/v1/doctors/mypatients/:patientId
//@access Public
exports.getDoctorSinglePatient = asyncHandler(async (req, res, next) => {
  // get patient
  let patient = await User.findById(req.params.patientId);
  if (!patient) {
    return next(
        new ErrorResponse(
            `Patient not found with id of ${req.params.patientId}`,
            404
        )
    );
  }
  // check if the doctor has at least had one appointment with the patient
  const appointments = await Appointment
      .find({doctor: req.user._id.toString(), user: req.params.patientId})
      .distinct('user');
  if (appointments.length < 1) {
    return next(
        new ErrorResponse(
            `No appointment held with patient of Id: ${req.params.patientId}`,
            404
        )
    );
  }
  res.status(200).json({ success: true, data: patient });
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