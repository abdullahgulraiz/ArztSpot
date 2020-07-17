const express = require("express");

const {
  createAppointment,
  getAppointmentForDoctor,
  getAppointmentById,
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
  .get(protectRoute, filterResults(Appointment, ['hospital', 'doctor', 'symptoms']), getAppointmentForUser);
router
  .route("/:id")
  .get(protectRoute, getAppointmentById)
  .put(protectRoute, updateAppointment)
  .delete(protectRoute, deleteAppointment);
router.route("/:hospitalId/:doctorId").get(getAppointmentForDoctor);

module.exports = router;
