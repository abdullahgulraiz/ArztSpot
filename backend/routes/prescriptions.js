const express = require("express");

const {
  createPrescription,
  getPrescription,
  getPrescriptionforUser,
  getPrescriptionforPatient,
  updatePrescription,
  deletePrescription,
  downloadPrescription,
  sendPrescription
} = require("../controllers/prescriptions");

const router = express.Router();
const Prescription = require("../models/Prescription");
const filterResults = require("../middleware/filterResults");

const { protectRoute, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protectRoute, authorize("doctor", "admin"), createPrescription)
  .get(protectRoute,
      authorize("doctor", "admin"),
      filterResults(Prescription, [{path: "appointment", populate: { path: "symptoms"}}]),
      getPrescriptionforUser);

router
    .route("/myprescriptions")
    .get(protectRoute, authorize("user"), getPrescriptionforPatient);

router
  .route("/:id")
  .get(protectRoute, authorize("doctor", "admin"), getPrescription)
  .put(protectRoute, authorize("doctor", "admin"), updatePrescription)
  .delete(protectRoute, authorize("doctor", "admin"), deletePrescription);

router
    .route("/:id/download")
    .get(protectRoute,authorize("doctor", "admin", "user"),downloadPrescription);

router
    .route("/:id/send")
    .post(protectRoute,authorize("doctor", "admin"),sendPrescription);

module.exports = router;
