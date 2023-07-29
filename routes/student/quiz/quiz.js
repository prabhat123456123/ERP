const express = require("express");
const router = express.Router();

 
const {
  getQuiz,singleQuiz,result
 
} = require("../../../controller/student");


router.get("/get-quiz", getQuiz);
router.get("/single-quiz", singleQuiz);
router.get("/result", result);




module.exports = router;
