const express = require("express");

const {register, login, updatePassword, updateDetails} = require("../controllers/auth");

const router = express.Router()
const { protectRoute } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/password").put(protectRoute, updatePassword);
router.route("/details").put(protectRoute, updateDetails);

module.exports = router