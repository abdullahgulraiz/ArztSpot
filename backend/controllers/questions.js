const Question = require("../models/Question");
const Response = require("../models/Response");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Symptom = require("../models/Symptom");
const Appointment = require("../models/Appointment");
const moment = require('moment');
const User = require("../models/User");

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
  question.description = description !== undefined ? description : question.description;
  question.type = type !== undefined ? type : question.type;
  question.symptoms = symptomIds.length > 0 ? symptomIds : question.symptoms;
  question.choices = choices !== undefined ? choices : question.choices;
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
  if (question.responses.length > 0) {
    return next(
        new ErrorResponse(`This question cannot be deleted because it already has responses.`, 500)
    );
  }
  await question.remove();
  await res.status(200).json({
    success: true,
    data: {},
  });
})

// @desc  Answer questions
//@route  POST /api/v1/questions/answer
//@access Private/patient
exports.answerQuestions = asyncHandler(async (req, res, next) => {
  const { responses } = req.body;
  for (const response of responses) {
    let question = await Question.findById(response.question);
    if (!question) {
      return next(
          new ErrorResponse(`Question not found with id ${response.question} `, 404)
      );
    }
    const appointment = await Appointment.findById(response.appointment);
    if (!appointment) {
      return next(
          new ErrorResponse(`Appointment not found with id ${response.appointment} `, 404)
      );
    }
    let response_ = await Response.create(response);
  }
  await res.status(200).json({ success: true });
});

// @desc  Get questions by a certain doctor
//@route  POST /api/v1/questions/doctor/:doctorId
//@access Private/patient
exports.questionsByDoctor = asyncHandler(async (req, res, next) => {
  let symptoms = [];
  if (req.query.symptoms) {
    symptoms = req.query.symptoms.split(',');
  }
  // get symptom ids of each symptom
  let symptomIds = [];
  for (const symptom_ of symptoms) {
    let symptoms = await Symptom.find({ name: { $regex : new RegExp(symptom_, "i") } });
    if (symptoms) {
      symptoms.map(symptom => {
        symptomIds.push(symptom._id.toString());
      });
    }
  }
  let query = {doctor: req.params.doctorId};
  if (symptomIds.length > 0) {
    query["symptoms"] = { $in: symptomIds }
  }
  const questions = await Question
      .find(query)
      .select("-responses")
      .populate("symptoms");
  if (!questions) {
    return next(
        new ErrorResponse(`Question not found with id ${req.params.id} `, 404)
    );
  }
  await res.status(200).json({ success: true, count: questions.length, data: questions });
});

// @desc  Get symptoms of questions by a certain doctor
//@route  POST /api/v1/questions/symptoms/doctor/:doctorId
//@access Private/patient
exports.symptomsOfQuestions = asyncHandler(async (req, res, next) => {
  let query = {doctor: req.params.doctorId};
  const doctor = await User.findOne({ _id: req.params.doctorId });
  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${doctorId}`, 404));
  }
  const symptoms = await Question
      .find(query)
      .select("symptoms")
      .populate("symptoms");
  await res.status(200).json({ success: true, data: symptoms });
});