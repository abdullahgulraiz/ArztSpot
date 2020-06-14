const express = require("express");

const {
  register,
  login,
  updatePassword,
  updateDetails,
  resetPassword,
  forgotpassword,
  getCurrentUser
} = require("../controllers/auth");

const router = express.Router();
const { protectRoute } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protectRoute, getCurrentUser);
router.route("/password").put(protectRoute, updatePassword);
router.route("/details").put(protectRoute, updateDetails);
router.route("/forgot-password").post(forgotpassword);
router.route("/reset-password/:resettoken").put(resetPassword);


module.exports = router;
