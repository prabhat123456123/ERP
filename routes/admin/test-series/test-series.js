const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  onlineTest,practiceTest
  
 
} = require("../../../controller/admin");

router.get("/online-test", onlineTest);
router.get("/practice-test", practiceTest);


module.exports = router;
