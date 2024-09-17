const express = require('express')
const router = express.Router();
const Userdata = require("../models/userdata")

router.get('/', (req, res) => {
    res.send("this is userdata page");
})


module.exports = router;