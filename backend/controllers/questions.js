const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");

// @desc  Create Question
// @route  POST /api/v1/questions
// @access Private/doctors
exports.getQuestion = asyncHandler(async (req, res, next) => {
    const questions = await Question.find()
    return res.status(200).json(questions)
});

exports.createQuestion = asyncHandler(async (req, res, next) => {
    const {description} = req.body
    const {alternatives} = req.body

    const question = await Question.create({
        description,
        alternatives
    })
    return res.status(201).json(question)
});

exports.getQuestionById = asyncHandler(async(req, res, next) => {
    const _id = req.params.id
    const question = await Question.findOne({_id})
    if (!question) {
        return res.status(404).json({})
    } else {
        return res.status(200).json(question)
    }
});

exports.updateQuestion = asyncHandler( async(req, res, next) => {
    const _id = req.params.id
    const{ description, alternatives } = req.body

    let question = await Question.findOne({_id})

    if(!question) {
        question = await Question.create({
            description,
            alternatives
        })
        return res.status(201).json(question)
    }else{
        question.description = description
        question.alternatives = alternatives
        await question.save()
        return res.status(200).json(question)
    }
});

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
    const _id = req.params.id

    const question = await Question.deleteOne({_id})

    if (question.deletedCount === 0) {
        return res.status(404).json()
    } else {
        return res.status(200).json("Question deleted.")
    }
});