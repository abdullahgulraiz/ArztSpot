const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    appointment: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    prescriptionData: [new Schema({
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: mongoose.Decimal128,
            required: true,
            min: 0.0
        },
        recurrenceNum: {
            type: mongoose.Decimal128,
            required: true,
            min: 0.0,
        },
        recurrenceType: {
            type: String,
            required: true,
            enum: ["Daily", "Weekly", "Fortnightly", "Monthly", "Yearly"]
        },
        until: {
            type: Date,
            default: Date.now,
            required: true
        },
    })],
    validity: {
        type: String,
        required: true,
        enum: ["1 day", "3 days", "7 days", "15 days"]
    },
    feeType: {
        type: String,
        required: true,
        enum: ["Public Insurance", "Private Insurance", "Self Paid"]
    },
    isSent: {
        type: Boolean,
        required: true,
        default: false
    },
    additionalNotes: {
        type: String
    },
},{
        timestamps: true,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;