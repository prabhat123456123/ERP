const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewCalender
 
} = require("../../../controller/admin");


router.get("/view-calender", viewCalender);




module.exports = router;
