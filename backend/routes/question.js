const express = require('express')
const router = express.Router()
const Question = require('../models/Question')

// get all questions

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error){
        return res.status(500).json({"error":error})
    }
})

// get one question

router.get('/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const question = await Question.findOne({_id})
        if (!question) {
            return res.status(404).json({})
        } else {
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create a question
router.post('/add', async (req,res) => {
    try {
        const {description} = req.body
        const {alternatives} = req.body

        const question = await Question.create({
            description,
            alternatives
        })
        return res.status(201).json(question)
    } catch(error) {
        return res. status(500).json({"error":error})
    }
})

// update a question
router.put('/:id', async (req, res) => {
    try {
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
    } catch(error) {
        return res.status(500).json({"error":error})
    }
})
// delete a question
router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({_id})

        if (question.deletedCount === 0) {
            return res.status(404).json()
        } else {
            return res.status(200).json("Question deleted.")
        }
    }catch(error){
            return res.status(500).json({"error": error})
    }
})


module.exports = router