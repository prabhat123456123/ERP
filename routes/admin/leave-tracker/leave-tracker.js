const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
 leaveTracker
} = require("../../../controller/admin");

router.get("/leave-tracker", leaveTracker);


module.exports = router;
