const express = require("express");
const router = express.Router();

 
const {
 reportStudent,reportFaculty
 
} = require("../../../controller/admin");

router.get("/report-student", reportStudent);
router.get("/report-faculty", reportFaculty);


module.exports = router;
