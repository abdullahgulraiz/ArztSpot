//get insurance
//add insurance
//delete insurance
//find by id (filtering purposes)
//update? Needed?

const router = require('express').Router();
let Insurance = require('../models/Insurance');


router.route('/').get((req,res) => {
    Insurance.find()
        .then(insurance => res.json(insurance))
        .catch (err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const is_public = Boolean(req.body.is_public);
    const phone = req.body.phone;
    const email = req.body.email;

    const newInsurance = new Insurance({name, is_public, phone, email});

    newInsurance.save()
        .then(() => res.json('Insurance added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').get((req,res) => {
    Insurance.findById(req.params.id)
        .then(insurance => res.json(insurance))
        .catch (err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Insurance.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
