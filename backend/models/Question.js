const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            selected: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

// const questionSchema = new Schema({
//     text: { type: String, required: true },
//     choices: {
//         type: [String],
//         required: true
//     },
//     ansDescription: String,
//     category: String,
//     published: {
//         type: Boolean,
//         default: false
//     }
// });

module.exports = mongoose.model('Question', questionSchema);