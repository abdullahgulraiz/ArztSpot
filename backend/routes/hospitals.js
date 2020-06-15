const express = require("express");

const { createHospital, getHospitals } = require("../controllers/hospitals");

const router = express.Router();

const { protectRoute, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getHospitals)
  .post(protectRoute, authorize("doctor", "admin"), createHospital);

module.exports = router;
