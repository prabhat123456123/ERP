const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  onlineTest,FullLengthTest,QuizTest,PracticeTest,getNewFulllengthTest,getCompletedFulllengthTest,getCompletedPracticeTest,getNewPracticeTest,getNewQuizTest,getCompletedQuizTest,viewExplaination,getQuestionExamWise,getFullLengthQuestion,submitExam,getPrevQuestion,getNextQuestion,getPracticeQuestion,getQuizQuestion
} = require("../../../controller/admin");

router.get("/online-test", onlineTest);
router.get("/full-length-test", FullLengthTest);
router.get("/quiz-test", QuizTest);
router.get("/practice-test", PracticeTest);

router.post("/get-new-fulllength-test", getNewFulllengthTest);
router.post("/get-completed-fulllength-test", getCompletedFulllengthTest);
router.post("/get-completed-practice-test", getCompletedPracticeTest);
router.post("/get-new-practice-test", getNewPracticeTest);
router.post("/get-new-quiz-test", getNewQuizTest);
router.post("/get-completed-quiz-test", getCompletedQuizTest);
router.post("/get-question-exam-wise", getQuestionExamWise);
router.post("/view-explaination", viewExplaination);
router.post("/get-full-length-question", getFullLengthQuestion);
router.post("/get-prev-question", getPrevQuestion);
router.post("/get-next-question", getNextQuestion);
router.post("/get-practice-question", getPracticeQuestion);

router.post("/get-quiz-question", getQuizQuestion);

router.post("/submit-exam", submitExam);

module.exports = router;
