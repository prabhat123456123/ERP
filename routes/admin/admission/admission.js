const express = require("express");
const router = express.Router();

 
const {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById
  
 
} = require("../../../controller/admin");

router.get("/admission", addAdmission);
router.post("/get-admission", getAdmission);
router.post("/fetch-student-byid", fetchStudentById);
router.post("/update-student-byid", updateStudentById);
router.post("/update-admission", updateAdmission);
router.post("/delete-admission", deleteAdmission);
router.post("/delete-multiple", deleteMultiple);


module.exports = router;
