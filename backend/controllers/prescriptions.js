const Prescription = require("../models/Prescription");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const moment = require('moment');
const sendEmail = require("../utils/sendEmail");

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
  const appointment = await Appointment.findOne({ _id: appointmentId });
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
  prescription.prescriptionData = prescriptionData !== undefined ? prescriptionData : prescription.prescriptionData;
  prescription.validity = validity !== undefined ? validity : prescription.validity;;
  prescription.feeType = feeType !== undefined ? feeType : prescription.feeType;;
  prescription.additionalNotes = additionalNotes !== undefined ? additionalNotes : prescription.additionalNotes;;
  prescription.isSent = isSent !== undefined ? isSent : prescription.isSent;;
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

// @desc  Send prescription to patient by email
//@route  POST /api/v1/prescriptions/:id/send
//@access Private/doctor
exports.sendPrescription = asyncHandler(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: "appointment",
        populate: [
          { path: "user" },
          { path: "doctor" },
          { path: "hospital" },
        ]
      })
      .populate({
        path: "patient"
      });
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
  // send email to patient
  const message = `
  Dear ${prescription.patient.firstname} ${prescription.patient.lastname},
  
  Your doctor just added a new Prescription for you regarding your appointment on ${moment(prescription.appointment.startTime).format("YYYY-MM-DD")}.
  To see all your prescriptions, visit <a href="https://www.arztspot.de/user/prescriptions">https://www.arztspot.de/user/prescriptions</a>.
  
  Best regards,
  The ArztSpot Team
  `;
  try {
    await sendEmail({
      email: prescription.patient.email,
      subject: "Prescription for Appointment on " + moment(prescription.appointment.startTime).format("YYYY-MM-DD"),
      message,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Email could not be sent", 500));
  }
  // change prescription sent status
  prescription.isSent = true;
  await prescription.save();
  await res.status(200).json({ success: true, prescription });
});

// @desc  Download prescription PDF
//@route  GET /api/v1/prescriptions/:id/download
//@access Private/doctor
exports.downloadPrescription = asyncHandler(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: "appointment",
        populate: [
            { path: "user" },
            { path: "doctor" },
            { path: "hospital" },
          ]
      });
  if (!prescription) {
    return next(
        new ErrorResponse(`Prescription not found with id ${req.params.id} `, 404)
    );
  }
  let prescriptionData = prescription.prescriptionData.map((p,idx) =>
      [
          idx + 1,
        p.name,
        p.quantity.toString(),
        p.recurrenceNum.toString() + ' ' + p.recurrenceType,
        moment(p.until).format("YYYY-MM-DD")
      ]
  );
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
  // Start generating prescription
  let docDefinition = {
    content: [
      {
        columns: [
          {
            width: '50%',
            text: {text: 'Prescription', style: 'header'}
          },
          {
            width: '50%',
            text: {text: 'ArztSpot', style: 'header', alignment: 'right'}
          },
        ],
      },
      {text: [{text: '\nInsurance: ', bold: true}, {text: prescription.appointment.user.insurance_company}]},
      {text: [{text: 'Prescription-Nr: ', bold: true}, {text: prescription._id}]},
      {text: 'Patient', style: 'subheader'},
      {text: [{text: prescription.appointment.user.firstname + ' ' + prescription.appointment.user.lastname, bold: true}]},
      {text: [{text: prescription.appointment.user.address_geojson.formattedAddress, bold: true}]},
      {text: [{text: '\nBorn on: ', bold: true}, {text: moment(prescription.appointment.user.birthday).format("YYYY-MM-DD")}]},
      {text: [{text: 'Insurance-Nr: ', bold: true}, {text: prescription.appointment.user.insurance_number}]},
      {text: 'Arzt', style: 'subheader'},
      {text: [{text: 'Arzt-Nr: ', bold: true}, {text: prescription.appointment.doctor._id}]}, // replace with arztNumber
      {text: [{text: 'Practice-Nr: ', bold: true}, {text: prescription.appointment.hospital._id}]}, // replace with practiceNumber
      {
        columns: [
          {
            width: 'auto',
            text: [{text: '\nFee Type: ', bold: true}, {text: prescription.feeType}]
          },
          {
            width: 'auto',
            text: [{text: '\nIssued on: ', bold: true}, {text: moment(prescription.date).format("YYYY-MM-DD")}]
          },
          {
            width: 'auto',
            text: [{text: '\nValidity: ', bold: true}, {text: prescription.validity}]
          },
        ],
        columnGap: 10
      },
      {text: 'Rx', style: 'subheader'},
      {
        style: 'tableExample',
        table: {
          widths: ['5%', '50%', '10%', '20%', '15%'],
          body: [
            [{text: '#', bold: true}, {text: 'Name', bold: true}, {text: 'Quantity', bold: true}, {text: 'Recurrence', bold: true}, {text: 'Until', bold: true}],
          ].concat(prescriptionData)
        }
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
        decoration: 'underline',
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      font: 'Roboto'
    }

  };
  try {
    let binaryResult = await createPdf(docDefinition);
    res.contentType('application/pdf').send(binaryResult);
  } catch(err){
    return next(
        new ErrorResponse(`There was an error displaying the PDF document: ${err.message}`, 500)
    );
  }
});


createPdf = async (docDefinition)=> {
  var fonts = {
    Roboto: {
      normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
      bold: 'node_modules/roboto-font/fonts/Roboto/roboto-medium-webfont.ttf',
      italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
      bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-mediumItalic-webfont.ttf'
    }
  };
  let pdfmake = require('pdfmake');
  let printer = new pdfmake(fonts);
  let pdfDoc = printer.createPdfKitDocument(docDefinition);
  return new Promise((resolve, reject) => {
    try {
      let chunks = [];
      pdfDoc.on('data', chunk => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    } catch (err) {
      reject(err);
    }
  });
};