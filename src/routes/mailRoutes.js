const express = require('express');
const router = express.Router();
const mailController = require('../controller/mailController');
const auth =require("../middleware/auth")

//router.post('/send-mail', mailController.sendMail);

module.exports = router;
 