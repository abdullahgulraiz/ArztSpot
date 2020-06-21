const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient: {
        name: {type: String,
            required: true
            },
        phone: {
            type: String,
            match: [
                /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/,
                "Please add a valid phone number formatted as +XX (XXX) XXX-XXX",
            ],
            required: true,
        },
        insurance_ID:{
            type: String,
            required: true
        }
    },
    doctor: {
        name: {
            type: String,
            required: true
        },
        specialty: {
            type: String,
            required: true
        }
    },
    location:{
        hospital:{
            name: {type: String},
            address: {type: String}
        },
        address:{
            type: String
        }
    },
    date:{
        type: Date,
        required: true
    }
});