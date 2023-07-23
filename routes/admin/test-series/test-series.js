const express = require("express");
const router = express.Router();

 
const {
  onlineTest,practiceTest
  
 
} = require("../../../controller/admin");

router.get("/online-test", onlineTest);
router.get("/practice-test", practiceTest);


module.exports = router;
