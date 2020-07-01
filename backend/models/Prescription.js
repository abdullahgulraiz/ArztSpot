const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    patient_name: {
        name: String,
        email: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    receipt_number:{
        type: Number,
        required: true
    },
    medicines_json:{
        type: String
    },
    validity:{
        type: String,
        required: true,
        enum: ["Valid", "Expired"]
    },
    fee_type:{
        type: String,
        required: true,
        enum: ["First Visit", "Regular Patient Fee"]
    },
    is_approved:{
        type: Boolean,
        required: true
    },
    additional_message:{
        type: String
    }
},{
        timestamps: true,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;