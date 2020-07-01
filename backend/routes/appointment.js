const express = require('express');

const {createAppointment, getAppointment} = require('../controllers/appointments')

const router = express.Router()
const Appointment = require("../models/Appointment");
const filterResults = require("../middleware/filterResults");

router.route('/').post(createAppointment)
router.route('/:id').get(filterResults(Appointment), getAppointment)

module.exports = router