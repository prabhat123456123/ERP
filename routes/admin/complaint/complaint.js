
const express = require("express");
const router = express.Router();

 
const {
  viewComplaint
 
} = require("../../../controller/admin");


router.get("/view-complaint", viewComplaint);




module.exports = router;
