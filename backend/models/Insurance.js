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
        pattern: /[a-z0-9\._%+!$&*=^|~#%{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,22})/
    }
},{
    timestamps: true
});

const Insurance = mongoose.model('Insurance', InsuranceSchema);
module.exports = Insurance;