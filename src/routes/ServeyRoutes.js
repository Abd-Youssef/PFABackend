const express = require('express');

const router = express.Router();
const serveyController = require("../controller/serveyController")
router.post('/createServey', serveyController.createServey)
router.get('/deleteServey',serveyController.deleteServey)
router.get('/getServeyDetails',serveyController.getServeyDetails)
router.get('/getServeyForeachUser',serveyController.getServeyForeachUser)
module.exports=router;