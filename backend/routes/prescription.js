const router = require('express').Router();
let Prescription = require('../models/prescription.model');

// Get exercises
router.route('/').get((req,res) => {
    Prescription.find()
        .then(prescription => res.json(prescription))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add a new Prescription
router.route('/add').post((req,res) => {
    const patient_name = req.body.patient_name;
    const doctor_name = req.body.doctor_name;
    const date = Date.parse(req.body.date);
    const receipt_number = Number(req.body.receipt_number);
    const medicines_json = req.body.medicines_json;
    const validity = req.body.validity;
    const fee_type = req.body.fee_type;
    const additional_message = req.body.additional_message;

    const newPrescription = new Prescription({
        patient_name,
        doctor_name,
        date,
        receipt_number,
        medicines_json,
        validity,
        fee_type,
        additional_message
    });

    newPrescription.save()
        .then(()=> res.json ('Prescription added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

//update prescription

router.route('/update/:id').post((req,res) => {
    Prescription.findById(req.params.id)
        .then(exercise => {
            Prescription.patient_name = req.body.patient_name;
            Prescription.doctor_name = req.body.doctor_name;
            Prescription.receipt_number = Number(req.body.receipt_number);
            Prescription.medicines_json = req.body.medicines_json;
            Prescription.validity = req.body.validity;
            Prescription.fee_type = req.body.fee_type;
            Prescription.additional_message = req.body.fee_type;


            Prescription.save()
                .then(() => res.json('Prescription updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Send prescription to be made!

module.exports = router;