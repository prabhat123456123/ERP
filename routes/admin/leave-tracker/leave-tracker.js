const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
 leaveStudentTracker,leaveFacultyTracker,getStudentLeave,updateStudentLeaveById,fetchStudentLeaveById,viewStudentLeaveById,updateStudentLeave,deleteStudentLeave,deleteStudentMultipleLeave,createStudentLeave,getFacultyLeave,updateFacultyLeaveById,fetchFacultyLeaveById,viewFacultyLeaveById,updateFacultyLeave,deleteFacultyLeave,deleteFacultyMultipleLeave,createFacultyLeave
} = require("../../../controller/admin");

router.get("/leave-student-tracker", leaveStudentTracker);
router.get("/leave-faculty-tracker", leaveFacultyTracker);

router.post("/get-student-leave",isAuthenticatedUser(), getStudentLeave);
router.post("/update-student-leave-by-id",isAuthenticatedUser(), updateStudentLeaveById);
router.post("/fetch-student-leave-byid",isAuthenticatedUser(), fetchStudentLeaveById);
router.post("/view-student-leave-byid",isAuthenticatedUser(), viewStudentLeaveById);
router.post("/update-student-leave",isAuthenticatedUser(), updateStudentLeave);
router.post("/delete-student-leave",isAuthenticatedUser(), deleteStudentLeave);
router.post("/delete-student-multiple-leave",isAuthenticatedUser(), deleteStudentMultipleLeave);
router.post("/create-student-leave", isAuthenticatedUser(), createStudentLeave);


router.post("/get-faculty-leave",isAuthenticatedUser(), getFacultyLeave);
router.post("/update-faculty-leave-by-id",isAuthenticatedUser(), updateFacultyLeaveById);
router.post("/fetch-faculty-leave-byid",isAuthenticatedUser(), fetchFacultyLeaveById);
router.post("/view-faculty-leave-byid",isAuthenticatedUser(), viewFacultyLeaveById);
router.post("/update-faculty-leave",isAuthenticatedUser(), updateFacultyLeave);
router.post("/delete-faculty-leave",isAuthenticatedUser(), deleteFacultyLeave);
router.post("/delete-faculty-multiple-leave",isAuthenticatedUser(), deleteFacultyMultipleLeave);
router.post("/create-faculty-leave", isAuthenticatedUser(), createFacultyLeave);

module.exports = router;
