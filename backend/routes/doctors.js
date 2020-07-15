const express = require("express");

const {
  getDoctors,
  getDoctor,
  addDoctorToHospital,
  getDoctorPatients,
  getDoctorSinglePatient
} = require("../controllers/doctors");

const User = require("../models/User");
const filterResults = require("../middleware/filterResults");

// Preserve parameters from parent router (Hospital) when needed
const router = express.Router({ mergeParams: true });

const { protectRoute, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(filterResults(User), getDoctors)
  .post(protectRoute,authorize('doctor', 'admin'), addDoctorToHospital);

router.route("/:id").get(getDoctor);

router
    .route("/mypatients")
    .post(protectRoute,authorize('doctor', 'admin'), getDoctorPatients);

router
    .route("/mypatients/:patientId")
    .get(protectRoute,authorize('doctor', 'admin'), getDoctorSinglePatient);

module.exports = router;
