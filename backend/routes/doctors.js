const express = require("express");

const {
  getDoctors,
  getDoctor,
  addDoctorToHospital
} = require("../controllers/doctors");

const User = require("../models/User");
const filterResults = require("../middleware/filterResults");

// Preserve parameters from parent router (Hospital) when needed
const router = express.Router({ mergeParams: true });

const { protectRoute, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(filterResults(User, 'hospital'), getDoctors)
  .post(protectRoute,authorize('doctor', 'admin'), addDoctorToHospital);

router.route("/:id").get(getDoctor);

module.exports = router;
