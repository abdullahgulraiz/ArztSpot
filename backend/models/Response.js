const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    },
    response: [{
        type: String,
        required: true
    }],
    appointment: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
        required: true
    },
})

module.exports = mongoose.model('Response', responseSchema);