const express = require("express");
const router = express.Router();

 
const {
  getQuiz,
 
} = require("../../../controller/student");


router.get("/get-quiz", getQuiz);




module.exports = router;
