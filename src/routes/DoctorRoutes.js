const express = require("express");

const router = express.Router();
const doctorController = require("../controller/doctorController");
const auth = require("../middleware/auth");

router.post("/addDoctor",auth, doctorController.addDoctor);
router.put("/updateDoctor/:doctorid",auth, doctorController.updateDoctor);
router.get("/getDoctors", auth, doctorController.geAllDoctors);
router.get("/deleteDoctor/:doctorid", auth, doctorController.deleteDoctor);
router.get("/getDoctorsSpecialities", auth, doctorController.getAllspecialities);

module.exports = router; 
 