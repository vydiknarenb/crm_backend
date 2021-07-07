const express = require("express");
const router = express.Router();
const User = require('../models/user_models');
const { registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//Get Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//Register or Post Users
router.post('/register', async (req, res) => {
    //REGISTER VALIDATION
    
    try {
        // const{ error } = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //Check it the user already exists
    // const emailExist = await User.findOne({email: req.body.email});
    // if(emailExist) return res.status(400).send('Email already exists');

    //HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create new user
    console.log(req.body);
        const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber,
        emailId: req.body.emailId,
        password: hashedPassword,
        role: req.body.role,
        country: req.body.country,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        date: req.body.date
    });


        const savedUser = await user.save();
        res.json({ user: user._id});
    } catch (err) {
        res.json({
            message: err
        });

    }
});


//Get Specific User
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


//Delete Specific User
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({
            _id: req.params.userId
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        });

    }
});


//Update or Edit Specific User
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                firstName: req.body.firstName
            }
        });
        res.json(updatedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/login', async(req, res) => {
    //Validate before logging
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email not found');
    //Password is Incorrect
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')
    res.send('Logged in!');
});
module.exports = router;