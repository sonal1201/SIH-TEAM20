const express = require('express')
const router = express.Router();
const Admin = require("../models/admin")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken");
const jwtsecret="MynameisNishantKumar";
const { body, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    res.send("this is admin page");
})

router.post('/signup',
    body('email').isEmail(),
    body('password', 'password is too short:').isLength({ min: 5 }),
    body('username').isLength({ min: 6 }).withMessage('invalid username')
    ,async (req, res) => {
    try {
        const { email, username } = req.body;
        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password,salt);

        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newAdmin = new Admin({ email, username, password:secpassword });
        const response = await newAdmin.save();
        console.log("Data saved");
        res.status(201).json(response);

    } catch (err) {
        console.error(err);
            res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email ID' });

        }
        const { password } = req.body;
        // const pass = await Admin.findOne({ password: password })
        const pwdcompare = await bcrypt.compare(password,admin.password);

        if (!pwdcompare) {
            return res.status(400).json({ message: 'wrong password' })
        }

        const data={
            admin:{
                id:admin.id
            }   
        }
        const authToken=jwt.sign(data,jwtsecret)

        const response = await admin.id;
        console.log("data fetched")
        res.status(200).json({response, authToken});

    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ error: 'Internal server error' });

    }


})

module.exports = router;