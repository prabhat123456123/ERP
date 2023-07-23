const express = require("express");
const router = express.Router();

 
const {
  attendanceStudent,attendanceFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,
 
} = require("../../../controller/admin");

router.get("/attendance-student", attendanceStudent);
router.post("/get-student", getStudent);
router.post("/update-student", updateStudent);
router.post("/delete-student", deleteStudent);
router.post("/delete-multiple-student", deleteMultipleStudent);

router.get("/attendance-faculty", attendanceFaculty);
router.post("/get-faculty", getFaculty);
router.post("/update-faculty", updateFaculty);
router.post("/delete-faculty", deleteFaculty);
router.post("/delete-multiple-faculty", deleteMultipleFaculty);




module.exports = router;
