const express = require("express");

const {
  createHospital,
  getHospitals,
  updateHospital,
  getHospital,
  deleteHospital
} = require("../controllers/hospitals");

const Hospital = require("../models/Hospital");
const filterResults = require("../middleware/filterResults");

// Include other resource routers
const doctorsRouter = require("./doctors");

const router = express.Router();

const { protectRoute, authorize } = require("../middleware/auth");

// Re-route into doctors routers
router.use("/:hospitalId/doctors", doctorsRouter);

router
  .route("/")
  .get(filterResults(Hospital, ["doctors"]), getHospitals)
  .post(protectRoute, authorize("doctor", "admin"), createHospital);

router
  .route("/:id")
  .get(getHospital)
  .put(protectRoute, authorize("doctor", "admin"), updateHospital)
  .delete(protectRoute, authorize("doctor", "admin"), deleteHospital);

module.exports = router;
