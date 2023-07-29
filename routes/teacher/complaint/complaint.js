const express = require("express");
const router = express.Router();

 
const {
  getComplaint,saveComplaint,editComplaint,updateComplaint,deleteComplaint,
 
} = require("../../../controller/teacher");


router.get("/get-complaint", getComplaint);
router.post("/save-complaint", saveComplaint);
router.get("/edit-complaint/:id", editComplaint);
router.post("/update-complaint", updateComplaint);
router.post("/delete-complaint", deleteComplaint);




module.exports = router;
