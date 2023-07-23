const express = require("express");
const router = express.Router();

 
const {
  getReport,
 
} = require("../../../controller/student");


router.get("/get-report", getReport);




module.exports = router;
