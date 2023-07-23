const express = require("express");
const router = express.Router();

 
const {
  financialStudent,financialFaculty
  
 
} = require("../../../controller/admin");

router.get("/financial-student", financialStudent);
router.get("/financial-faculty", financialFaculty);



module.exports = router;
