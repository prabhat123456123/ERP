const express = require("express");
const router = express.Router();

 
const {
  getQuiz,singleQuiz
 
} = require("../../../controller/student");


router.get("/get-quiz", getQuiz);
router.get("/single-quiz", singleQuiz);




module.exports = router;
