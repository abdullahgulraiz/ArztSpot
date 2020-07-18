const mongoose = require('mongoose');
const { Schema } = mongoose;

const validateResponseLength = function () {
    if (this.question.type !== "Single Choice" || this.type !== "Multiple Choice") {
        if (this.response.length > 1) {
            return false;
        }
    }
};

const responseSchema = new Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    },
    response: [{
        type: String,
        required: true,
        validate: [validateResponseLength, "This type of question cannot have multiple answers as a response."]
    }]
})

module.exports = mongoose.model('Response', responseSchema);