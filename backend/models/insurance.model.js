const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    is_public: {
        type: Boolean
    },
    phone:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
});

const Insurance = mongoose.model('Insurance', InsuranceSchema);
module.exports = Insurance;