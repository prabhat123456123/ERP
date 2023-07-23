

const express = require("express");
const router = express.Router();

 
const {
  viewExam
 
} = require("../../../controller/admin");


router.get("/view-exam", viewExam);





module.exports = router;
