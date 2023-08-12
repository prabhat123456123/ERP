
const express = require("express");
const router = express.Router();

 
const {
  viewComplaint,getComplaint
 
} = require("../../../controller/admin");


router.get("/view-complaint", viewComplaint);
router.post("/get-complaint", getComplaint);




module.exports = router;
