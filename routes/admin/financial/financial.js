const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

  
const {
  addStudentFinancial,getStudentFinancial,addFacultyFinancial,getFacultyFinancial,viewStudentFeeDetails,viewFacultyFeeDetails
} = require("../../../controller/admin");



router.get("/student-financial",isAuthenticatedUser(), addStudentFinancial);
router.post("/get-student-financial",isAuthenticatedUser(), getStudentFinancial);
router.get("/view-student-fee-details/:studentId",isAuthenticatedUser(), viewStudentFeeDetails);




router.get("/faculty-financial",isAuthenticatedUser(), addFacultyFinancial);
router.post("/get-faculty-financial",isAuthenticatedUser(), getFacultyFinancial);
router.get("/view-faculty-fee-details/:id",isAuthenticatedUser(), viewFacultyFeeDetails);


module.exports = router;
