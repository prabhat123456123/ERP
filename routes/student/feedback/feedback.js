const express = require("express");
const router = express.Router();

 
const {
  feedback,
 
} = require("../../../controller/student");


router.post("/feedback", feedback);




module.exports = router;
