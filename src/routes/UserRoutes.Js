const express = require("express");

const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.put("/changePassword", userController.changePassword);
router.get("/getUserDetails", auth, userController.getUserDetails);
router.get("/deleteUser", auth, userController.deleteUser);
router.post("/sendmail",auth, userController.sendMail);
router.get("/login-count-by-day", userController.getLoginCountByDay);


module.exports = router; 
 