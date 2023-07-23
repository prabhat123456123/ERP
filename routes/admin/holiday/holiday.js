const express = require("express");
const router = express.Router();

 
const {
 viewHoliday
} = require("../../../controller/admin");

router.get("/view-holiday", viewHoliday);


module.exports = router;
