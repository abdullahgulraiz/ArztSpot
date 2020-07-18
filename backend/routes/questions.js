const express = require("express");
const {
  createQuestion,
  getQuestion,
  getQuestionforUser,
  updateQuestion,
  deleteQuestion,
  answerQuestion
} = require("../controllers/questions");

const router = express.Router();
const Question = require("../models/Question");
const filterResults = require("../middleware/filterResults");

const { protectRoute, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protectRoute, authorize("doctor", "admin"), createQuestion)
  .get(protectRoute,authorize("doctor", "admin"),filterResults(Question, ["doctor", "symptoms", "responses"]), getQuestionforUser);

router
  .route("/:id")
  .get(protectRoute, authorize("doctor", "admin"), getQuestion)
  .put(protectRoute, authorize("doctor", "admin"), updateQuestion)
  .delete(protectRoute, authorize("doctor", "admin"), deleteQuestion);

router
    .route("/:id/answer")
    .post(protectRoute,authorize("user"),answerQuestion);

module.exports = router;
