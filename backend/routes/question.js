const express = require('express')
const router = express.Router()
const { protectRoute, authorize } = require("../middleware/auth");
const {
    getQuestion,
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion } = require('../controllers/questions')

// get all questions
// create a question

router.route('/')
    .get(getQuestion)
    .post(protectRoute, authorize('doctor', 'admin'), createQuestion);


// get a single question
// update a particular question
// delete a question

router.route('/:id')
    .get(getQuestionById)
    .put(protectRoute, authorize('doctor', 'admin'), updateQuestion)
    .delete(protectRoute, authorize('doctor', 'admin'), deleteQuestion);

module.exports = router