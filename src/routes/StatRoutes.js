const express = require("express");

const router = express.Router();
const statController = require("../controller/statController");


// router.get("/login-count-by-day", statController.calculateDailyStats);
// router.get("/user-count", statController.calculateNumberUsers);
router.post("/AllTimeStats", statController.AllTimeStats);
router.post("/DailyStats", statController.DailyStats);
router.post("/MonthlyStats", statController.MonthlyStats);
router.post("/WeeklyStats", statController.WeeklyStats);
module.exports = router; 
 