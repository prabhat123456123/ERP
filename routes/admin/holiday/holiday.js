const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
 viewHoliday
} = require("../../../controller/admin");

router.get("/view-holiday", viewHoliday);


module.exports = router;
