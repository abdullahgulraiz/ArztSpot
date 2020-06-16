const express = require("express");

const {
  getDoctors,
  getDoctor,
  addDoctorToHospital,
  getDoctorsWithinRadius
} = require("../controllers/doctors");

// Preserve parameters from parent router (Hospital) when needed
const router = express.Router({ mergeParams: true });

const { protectRoute, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getDoctors)
  .post(protectRoute,authorize('doctor', 'admin'), addDoctorToHospital);

router.route("/:id").get(getDoctor);
router.route("/search/:distance").get(protectRoute, authorize('user'), getDoctorsWithinRadius)

module.exports = router;
