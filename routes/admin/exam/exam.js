

const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewExam,getExam,updateExamById,fetchExamById,viewExamById,updateExam,deleteExam,deleteMultipleExam,createExam,examWiseQuestion
 ,getQuestion,updateQuestionById,fetchQuestionById,viewQuestionById,updateQuestion,deleteQuestion,deleteMultipleQuestion,createQuestion,subjectMarks,getSubjectMarks,updateSubjectMarksById,fetchSubjectMarksById,viewSubjectMarksById,updateSubjectMarks,deleteSubjectMarks,deleteMultipleSubjectMarks,createSubjectMarks,fetchStudentAndSubjectByClass ,assignExam,fetchSubjectByClass
} = require("../../../controller/admin");


router.get("/view-exam", isAuthenticatedUser(), viewExam);
router.get("/examWiseQuestion/:id", isAuthenticatedUser(), examWiseQuestion);


router.post("/get-exam",isAuthenticatedUser(), getExam);
router.post("/update-exam-by-id",isAuthenticatedUser(), updateExamById);
router.post("/fetch-exam-byid",isAuthenticatedUser(), fetchExamById);
router.post("/view-exam-byid",isAuthenticatedUser(), viewExamById);
router.post("/update-exam",isAuthenticatedUser(), updateExam);
router.post("/delete-exam",isAuthenticatedUser(), deleteExam);
router.post("/delete-multiple-exam",isAuthenticatedUser(), deleteMultipleExam);
router.post("/create-exam", isAuthenticatedUser(), createExam);

router.post("/get-question",isAuthenticatedUser(), getQuestion);
router.post("/update-question-by-id",isAuthenticatedUser(), updateQuestionById);
router.post("/fetch-question-byid",isAuthenticatedUser(), fetchQuestionById);
router.post("/view-question-byid",isAuthenticatedUser(), viewQuestionById);
router.post("/update-question",isAuthenticatedUser(), updateQuestion);
router.post("/delete-question",isAuthenticatedUser(), deleteQuestion);
router.post("/delete-multiple-question",isAuthenticatedUser(), deleteMultipleQuestion);
router.post("/create-question", isAuthenticatedUser(),createQuestion);

router.get("/subject-marks",isAuthenticatedUser(), subjectMarks);
router.post("/get-subject-marks",isAuthenticatedUser(), getSubjectMarks);
router.post("/update-subject-marks-by-id", isAuthenticatedUser(), updateSubjectMarksById);
router.post("/fetch-subject-marks-byid", isAuthenticatedUser(), fetchSubjectMarksById);
router.post("/fetch-studentAndSubject-by-class", isAuthenticatedUser(), fetchStudentAndSubjectByClass);
router.post("/fetch-subject-by-class", isAuthenticatedUser(), fetchSubjectByClass);

router.post("/view-subject-marks-byid",isAuthenticatedUser(), viewSubjectMarksById);
router.post("/update-subject-marks",isAuthenticatedUser(), updateSubjectMarks);
router.post("/delete-subject-marks",isAuthenticatedUser(), deleteSubjectMarks);
router.post("/delete-multiple-subject-marks",isAuthenticatedUser(), deleteMultipleSubjectMarks);
router.post("/create-subject-marks", isAuthenticatedUser(),createSubjectMarks);

router.post("/assign-exam", isAuthenticatedUser(),assignExam);


module.exports = router;
