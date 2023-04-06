const express = require('express');
const auth =require("../middleware/auth")

const router = express.Router();
const serveyController = require("../controller/serveyController")
router.post('/createServey',auth, serveyController.createServey)
router.get('/deleteServey',auth,serveyController.deleteServey)
router.get('/getServeyDetails',auth,serveyController.getServeyDetails)
router.get('/getServeyForeachUser/:userid',auth,serveyController.getServeyForeachUser)

router.get('/deleteAllServey',auth,serveyController.deleteAllServey)
module.exports=router;   