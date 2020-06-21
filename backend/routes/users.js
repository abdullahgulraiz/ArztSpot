const router = require('express').Router();
let User = require('../models/user.model'); // mongoose model that we created

router.route('/').get((req, res) => {           //handles get requests from the user.
    User.find()                                 // find method returns a promise:
        .then(users => res.json(users))        // we are going to return sth in json format: the users in our database
        .catch(err => res.status(400).json('Error: ' + err));
});

    //let's code the second endpoint:
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()                              // New user saved to the database
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+err));
});
module.exports = router; // exporting the router