const express = require('express')
const router = express.Router();
const Userdata = require("../models/userdata")
const { body, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    res.send("this is userdata page");
})



router.post('/send',
    body('address', 'password is too short:').isLength({ min: 5 })
    ,async (req, res) => {
    try {
        const { address, pincode } = req.body;

        const userdata = new Userdata({ address, pincode });
        const response = await userdata.save();
        console.log("User Data saved");
        res.status(201).json(response);

    } catch (err) {
        console.error(err);
            res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});



module.exports = router;