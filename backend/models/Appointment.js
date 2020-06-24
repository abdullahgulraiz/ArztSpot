const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.ObjectId,
    ref: "Hospital",
    required: true,
  },
  startTime: {
    type: Date,
    required: [true, "Please select a starting time"],
  },
  finishTime: {
    type: Date,
    required: [true, "Please select a finishing time"],
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
