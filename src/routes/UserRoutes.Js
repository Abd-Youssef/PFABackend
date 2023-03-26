const express = require('express');

const router = express.Router();
const userController = require("../controller/userController")
const auth =require("../middleware/auth")

router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.get('/getUserDetails',auth,userController.getUserDetails)
router.get('/deleteUser',auth,userController.deleteUser)


module.exports=router;