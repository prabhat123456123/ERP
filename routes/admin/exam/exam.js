

const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewExam,getExam,updateExamById,fetchExamById,viewExamById,updateExamId,updateExam,deleteExam,deleteMultipleExam,createExam
 
} = require("../../../controller/admin");


router.get("/view-exam", isAuthenticatedUser(), viewExam);


router.post("/get-exam",isAuthenticatedUser(), getExam);
router.post("/update-exam-by-id",isAuthenticatedUser(), updateExamById);
router.post("/fetch-exam-byid",isAuthenticatedUser(), fetchExamById);
router.post("/view-exam-byid",isAuthenticatedUser(), viewExamById);
router.post("/update-exam-id",isAuthenticatedUser(), updateExamId);
router.post("/update-exam",isAuthenticatedUser(), updateExam);
router.post("/delete-exam",isAuthenticatedUser(), deleteExam);
router.post("/delete-multiple-exam",isAuthenticatedUser(), deleteMultipleExam);
router.post("/create-exam", isAuthenticatedUser(),createExam);





module.exports = router;
