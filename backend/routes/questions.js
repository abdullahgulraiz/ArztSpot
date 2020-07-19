const express = require("express");
const {
  createQuestion,
  getQuestion,
  getQuestionforUser,
  updateQuestion,
  deleteQuestion,
  answerQuestions,
  questionsByDoctor,
  symptomsOfQuestions,
    questionsOfAppointment
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
    .route("/answer")
    .post(protectRoute,authorize("user"),answerQuestions);

router
  .route("/:id")
  .get(protectRoute, authorize("doctor", "admin"), getQuestion)
  .put(protectRoute, authorize("doctor", "admin"), updateQuestion)
  .delete(protectRoute, authorize("doctor", "admin"), deleteQuestion);

router
    .route("/doctor/:doctorId")
    .get(protectRoute,authorize("user", "doctor"),questionsByDoctor);

router
    .route("/symptoms/doctor/:doctorId")
    .get(symptomsOfQuestions);

router
    .route("/appointment/:appointmentId")
    .get(protectRoute,authorize( "doctor"), questionsOfAppointment);

module.exports = router;
