const express = require("express");
const router = express.Router();

 
const {
  getStudent,
 
} = require("../../../controller/teacher");


router.get("/", getStudent);




module.exports = router;
