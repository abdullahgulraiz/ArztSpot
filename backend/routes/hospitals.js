const express = require("express");

const {
  createHospital
} = require("../controllers/hospitals");

const router = express.Router();
router.route("/").post(createHospital);

module.exports = router