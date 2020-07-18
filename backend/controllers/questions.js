const Question = require("../models/Question");
const Response = require("../models/Response");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Symptom = require("../models/Symptom");
const Appointment = require("../models/Appointment");
const moment = require('moment');

// @desc  Create new question
// @route  POST /api/v1/questions
// @access Private/doctor
exports.createQuestion = asyncHandler(async (req, res, next) => {
  let question;
  const { description, type, symptoms, choices } = req.body;
  // get symptom ids of each symptom
  let symptomIds = [];
  for (const symptom_ of symptoms) {
    let symptom = await Symptom.findOne({ name: { $regex : new RegExp(symptom_, "i") } });
    if (symptom) {
      symptomIds.push(symptom._id.toString());
    } else {
      symptom = await Symptom.create({
        name: symptom_,
      });
      symptomIds.push(symptom._id.toString());
    }
  }
  // create question
  question = await Question.create({
    doctor: req.user._id,
    description: description,
    symptoms: symptomIds,
    choices: choices,
    type: type
  });
  await res.status(200).json({ success: true, question });
});

// @desc  Get Questions made by logged-in doctor
// @route  GET /api/v1/questions/
// @access Private/doctor
exports.getQuestionforUser = asyncHandler(async (req, res, next) => {
  await res.status(200).json(res.filterResults);
});

// @desc  Get Question by Id
//@route  GET /api/v1/questions/:id
//@access Private/doctor
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of the question should have access to it
  if (
    question.doctor._id.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`You are not authorized to see this question`, 401)
    );
  }
  await res.status(200).json({ success: true, question });
});

// @desc  Update Question
// @route  PUT /api/v1/questions/:id
// @access Private/doctor
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  let question;
  question = await Question.findById(req.params.id);
  const { description, type, symptoms, choices, isDeleted } = req.body;
  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that question should have access
  if (
    question.doctor._id.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`You are not authorized to update this question`, 401)
    );
  }
  question.description = description !== undefined ? description : question.description;
  question.type = type !== undefined ? type : question.type;
  question.symptoms = symptoms !== undefined ? symptoms : question.symptoms;
  question.choices = choices !== undefined ? choices : question.choices;
  question.isDeleted = isDeleted !== undefined ? isDeleted : question.isDeleted;
  await question.save();
  await res.status(200).json({ success: true, question });
});

// @desc  Delete Question
// @route  DELETE /api/v1/questions/:id
// @access Private/doctor
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of that question should have access
  if (
      question.doctor._id.toString() !== req.user.id &&
      req.user.role !== "admin"
  ) {
    return next(
        new ErrorResponse(`You are not authorized to update this question`, 401)
    );
  }
  question.isDeleted = true;
  await question.save();
  await res.status(200).json({
    success: true,
    data: {},
  });
})

// @desc  Answer question by Id
//@route  POST /api/v1/questions/:id/answer
//@access Private/patient
exports.answerQuestion = asyncHandler(async (req, res, next) => {
  const { response } = req.body;
  const question = await Question.findById(req.params.id);
  if (!question) {
    return next(
        new ErrorResponse(`Question not found with id ${req.params.id} `, 404)
    );
  }
  // only doctor and patient of the question should have access to it
  if (
      question.doctor._id.toString() !== req.user.id &&
      req.user.role !== "admin"
  ) {
    return next(
        new ErrorResponse(`You are not authorized to see this question`, 401)
    );
  }
  // create response
  let response_ = await Response.create({
    question: question._id.toString(),
    response: response,
  });
  await res.status(200).json({ success: true, question });
});