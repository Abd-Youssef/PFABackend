const express = require('express');

const router = express.Router();
const userController = require("../controller/userController")
const serveyController = require("../controller/serveyController")
const auth =require("../middleware/auth")

router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.get('/getUserDetails',auth,userController.getUserDetails)
router.get('/deleteUser',auth,userController.deleteUser)
router.post('/createServey', serveyController.createServey)
router.get('/deleteServey',serveyController.deleteServey)
router.get('/getServeyDetails',serveyController.getServeyDetails)
router.get('/getServeyForeachUser',serveyController.getServeyForeachUser)
module.exports=router;