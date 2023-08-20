const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  financialStudent,financialFaculty
  
 
} = require("../../../controller/admin");

router.get("/financial-student", financialStudent);
router.get("/financial-faculty", financialFaculty);



module.exports = router;
