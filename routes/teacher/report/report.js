const express = require("express");
const router = express.Router();

 
const {
  getReport,
 
} = require("../../../controller/teacher");


router.get("/get-report", getReport);




module.exports = router;
