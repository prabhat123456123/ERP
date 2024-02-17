const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
 reportStudent,reportFaculty,fetchStudentByClass,fetchStudentReportByClass
 
} = require("../../../controller/admin");

router.get("/report-student", reportStudent);
router.get("/report-faculty", reportFaculty);
router.post("/fetch-student-by-class", fetchStudentByClass);
router.post("/fetch-studentReport-by-class", fetchStudentReportByClass);


module.exports = router;
