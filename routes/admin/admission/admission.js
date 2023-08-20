const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById,createStudent,viewStudentById
  ,updateAdmissionById,bulkCreateStudent,exportExcel,exportPdf
 
} = require("../../../controller/admin");

router.get("/admission",isAuthenticatedUser(), addAdmission);
router.get("/export-excel",isAuthenticatedUser(), exportExcel);
router.get("/export-pdf",isAuthenticatedUser(), exportPdf);
router.post("/get-admission",isAuthenticatedUser(), getAdmission);
router.post("/update-admission-by-id",isAuthenticatedUser(), updateAdmissionById);
router.post("/fetch-student-byid",isAuthenticatedUser(), fetchStudentById);
router.post("/view-student-byid",isAuthenticatedUser(), viewStudentById);
router.post("/update-student-byid",isAuthenticatedUser(), updateStudentById);
router.post("/update-admission",isAuthenticatedUser(), updateAdmission);
router.post("/delete-admission",isAuthenticatedUser(), deleteAdmission);
router.post("/delete-multiple",isAuthenticatedUser(), deleteMultiple);
router.post("/create-student", isAuthenticatedUser(),createStudent);
router.post("/bulk-create-student", isAuthenticatedUser(),bulkCreateStudent);


module.exports = router;
