const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

  
const {
  addSubject,getSubject,updateSubjectById,fetchSubjectById,viewSubjectById,updateSubject,deleteSubject,deleteMultipleSubject,createSubject
 
} = require("../../../controller/admin");



router.get("/subject/:id",isAuthenticatedUser(), addSubject);
router.post("/get-subject",isAuthenticatedUser(), getSubject);
router.post("/update-subject-by-id", isAuthenticatedUser(), updateSubjectById);
router.post("/fetch-subject-byid", isAuthenticatedUser(), fetchSubjectById);

router.post("/view-subject-byid",isAuthenticatedUser(), viewSubjectById);
router.post("/update-subject",isAuthenticatedUser(), updateSubject);
router.post("/delete-subject",isAuthenticatedUser(), deleteSubject);
router.post("/delete-multiple-subject",isAuthenticatedUser(), deleteMultipleSubject);
router.post("/create-subject", isAuthenticatedUser(),createSubject);
module.exports = router;
