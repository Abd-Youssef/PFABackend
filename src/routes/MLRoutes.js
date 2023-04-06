const express = require("express");

const router = express.Router();
const userController = require("../controller/MLController");

router.post("/HeartPred", userController.predict);

   

module.exports = router; 