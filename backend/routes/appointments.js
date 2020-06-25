const express = require("express");

const {
  createAppointment,
  getAppointment,
  getAppointmentForUser,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");

const router = express.Router();
const Appointment = require("../models/Appointment");
const filterResults = require("../middleware/filterResults");

const { protectRoute } = require("../middleware/auth");

router
  .route("/")
  .post(protectRoute, createAppointment)
  .get(protectRoute, filterResults(Appointment), getAppointmentForUser);
router
  .route("/:id")
  .get(protectRoute, getAppointment)
  .put(protectRoute, updateAppointment)
  .delete(protectRoute, deleteAppointment);

module.exports = router;
