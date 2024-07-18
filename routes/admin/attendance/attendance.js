const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  attendanceStudent,attendanceFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,checkinStudentAttendance,checkoutStudentAttendance,getStudentAttendanceReport,checkinFacultyAttendance,checkoutFacultyAttendance,getFacultyAttendanceReport,getReportByStudent,getReportByFaculty,attendance,getAttendance,updateAttendanceById
 
} = require("../../../controller/admin");

router.get("/attendance-student",isAuthenticatedUser(), attendanceStudent);
router.get("/attendance",isAuthenticatedUser(), attendance);
router.post("/get-attendance",isAuthenticatedUser(), getAttendance);
router.post("/get-student",isAuthenticatedUser(), getStudent);
router.post("/checkin-student-attendance",isAuthenticatedUser(), checkinStudentAttendance);
router.post("/checkout-student-attendance",isAuthenticatedUser(), checkoutStudentAttendance);
// router.post("/get-student",isAuthenticatedUser(), getStudent);
router.post("/get-student-attendance-report",isAuthenticatedUser(), getStudentAttendanceReport);
router.post("/get-report-by-student",isAuthenticatedUser(), getReportByStudent);
router.post("/update-student", updateStudent);
router.post("/delete-student", deleteStudent);
router.post("/delete-multiple-student", deleteMultipleStudent);

router.get("/attendance-faculty",isAuthenticatedUser(), attendanceFaculty);
router.post("/get-faculty", isAuthenticatedUser(), getFaculty);
router.post("/checkin-faculty-attendance",isAuthenticatedUser(), checkinFacultyAttendance);
router.post("/checkout-faculty-attendance",isAuthenticatedUser(), checkoutFacultyAttendance);
router.post("/get-faculty-attendance-report",isAuthenticatedUser(), getFacultyAttendanceReport);
router.post("/get-report-by-faculty",isAuthenticatedUser(), getReportByFaculty);
router.post("/update-faculty", updateFaculty);
router.post("/update-attendance-byid", updateAttendanceById);
router.post("/delete-faculty", deleteFaculty);
router.post("/delete-multiple-faculty", deleteMultipleFaculty);




module.exports = router;
