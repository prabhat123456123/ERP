const express = require("express");
const router = express.Router();

 
const {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById,createStudent,viewStudentById
  
 
} = require("../../../controller/admin");

router.get("/admission", addAdmission);
router.post("/get-admission", getAdmission);
router.post("/fetch-student-byid", fetchStudentById);
router.post("/view-student-byid", viewStudentById);
router.post("/update-student-byid", updateStudentById);
router.post("/update-admission", updateAdmission);
router.post("/delete-admission", deleteAdmission);
router.post("/delete-multiple", deleteMultiple);
router.post("/create-student", createStudent);


module.exports = router;
