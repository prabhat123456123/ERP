const express = require("express");
const router = express.Router();

 
const {
  getComplaint,
 
} = require("../../../controller/teacher");


router.get("/get-complaint", getComplaint);




module.exports = router;
