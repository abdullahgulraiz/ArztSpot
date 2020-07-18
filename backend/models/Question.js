const mongoose = require('mongoose');
const { Schema } = mongoose;

const shouldHaveChoices = function () {
    return this.type === "Single Choice" || this.type === "Multiple Choice";
};

const questionSchema = new Schema({
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Text", "Single Choice", "Multiple Choice"]
    },
    symptoms: [{
        type: mongoose.Schema.ObjectId,
        ref: "Symptom",
        required: true
    }],
    choices: [{
        type: String,
        validate: [shouldHaveChoices, "This type of question cannot have choices."]
    }],
    responses: [{
        type: mongoose.Schema.ObjectId,
        ref: "Response"
    }]
})

module.exports = mongoose.model('Question', questionSchema);