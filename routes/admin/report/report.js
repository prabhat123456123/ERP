const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
 reportStudent,reportFaculty,fetchStudentByClass,fetchStudentReportByClass,getCertificate,updateCertificateById,fetchCertificateById,viewCertificateById,deleteCertificate,deleteMultipleCertificate,createCertificate,certificateRender,getClass,assignCertificate
 
} = require("../../../controller/admin");

router.get("/report-student",isAuthenticatedUser(), reportStudent);
router.get("/certificate-render",isAuthenticatedUser(), certificateRender);
router.get("/report-faculty",isAuthenticatedUser(), reportFaculty);
router.post("/fetch-student-by-class",isAuthenticatedUser(), fetchStudentByClass);
router.post("/fetch-studentReport-by-class",isAuthenticatedUser(), fetchStudentReportByClass);
router.post("/get-certificate",isAuthenticatedUser(), getCertificate);
router.post("/update-certificate-by-id",isAuthenticatedUser(), updateCertificateById);
router.post("/fetch-certificate-byid",isAuthenticatedUser(), fetchCertificateById);
router.post("/view-certificate-byid",isAuthenticatedUser(), viewCertificateById);
router.post("/delete-certificate",isAuthenticatedUser(), deleteCertificate);
router.post("/delete-multiple",isAuthenticatedUser(), deleteMultipleCertificate);
router.post("/create-certificate", isAuthenticatedUser(),createCertificate);
router.post("/get-class", isAuthenticatedUser(),getClass);
router.post("/assign-certificate", isAuthenticatedUser(),assignCertificate);


module.exports = router;
