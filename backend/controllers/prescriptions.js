const Prescription = require("../models/Prescription");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc  Create new prescription
// @route  POST /api/v1/prescription
// @access Private/doctor
exports.createPrescription = asyncHandler(async (req, res, next) => {
  let prescription;
  const { patientId, doctorId, appointmentId, prescriptionData, validity, feeType, additionalNotes, isSent } = req.body;
  // find the doctor making prescription
  const doctor = await User.findOne({ _id: doctorId });
  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${doctorId}`, 404));
  }
  // find the patient for whom prescription is being made
  const patient = await User.findOne({ _id: patientId });
  if (!patient) {
    return next(new ErrorResponse(`Patient not found with id of ${patientId}`, 404));
  }
  // find the appointment for which prescription is being made
  const appointment = await User.findOne({ _id: appointmentId });
  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${appointmentId}`, 404));
  }
  // create prescription
  prescription = await Prescription.create({
    doctor: doctorId,
    patient: patientId,
    appointment: appointmentId,
    prescriptionData: prescriptionData,
    validity: validity,
    feeType: feeType,
    additionalNotes: additionalNotes,
    isSent: isSent
  });
  await res.status(200).json({ success: true, prescription });
});

// @desc  Get Prescriptions made by logged-in doctor
// @route  GET /api/v1/prescriptions/
// @access Private/doctor
exports.getPrescriptionforUser = asyncHandler(async (req, res, next) => {
  await res.status(200).json(res.filterResults);
});

// @desc  Get Prescription by Id
//@route  GET /api/v1/prescriptions/:id
//@access Private/doctor
exports.getPrescription = asyncHandler(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id);
  if (!prescription) {
    return next(
      new ErrorResponse(`Prescription not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of the prescription should have access to it
  if (
    prescription.doctor.toString() !== req.user.id &&
    prescription.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`You are not authorized to see this prescription`, 401)
    );
  }
  await res.status(200).json({ success: true, prescription });
});

// @desc  Update Prescription
// @route  PUT /api/v1/prescriptions/:id
// @access Private/doctor
exports.updatePrescription = asyncHandler(async (req, res, next) => {
  let prescription;
  prescription = await Prescription.findById(req.params.id);
  const { prescriptionData, validity, feeType, additionalNotes, isSent } = req.body;
  if (!prescription) {
    return next(
      new ErrorResponse(`Prescription not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that prescription should have access
  if (
    prescription.doctor.toString() !== req.user.id &&
    prescription.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`You are not authorized to update this prescription`, 401)
    );
  }
  prescription.prescriptionData = prescriptionData;
  prescription.validity = validity;
  prescription.feeType = feeType;
  prescription.additionalNotes = additionalNotes;
  prescription.isSent = isSent;
  await prescription.save()
  await res.status(200).json({ success: true, prescription });
});

// @desc  Delete Prescription
// @route  DELETE /api/v1/prescriptions/:id
// @access Private/doctor
exports.deletePrescription = asyncHandler(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id);
  if (!prescription) {
    return next(
      new ErrorResponse(`Prescription not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that prescription should have access
  if (
      prescription.doctor.toString() !== req.user.id &&
      prescription.user.toString() !== req.user.id &&
      req.user.role !== "admin"
  ) {
    return next(
        new ErrorResponse(`You are not authorized to update this prescription`, 401)
    );
  }
  await prescription.remove();
  await res.status(200).json({
    success: true,
    data: {},
  });
})
