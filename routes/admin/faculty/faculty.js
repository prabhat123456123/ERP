const express = require("express");
const router = express.Router();

 
const {
  viewFaculty,getFacultyData,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,createFaculty
 
} = require("../../../controller/admin");


router.get("/view-faculty", viewFaculty);
router.post("/get-faculty", getFacultyData);
router.post("/update-faculty", updateFacultyData);
router.post("/delete-faculty", deleteFacultyData);
router.post("/create-faculty", createFaculty);
router.post("/delete-multiple-faculty", deleteMultipleFacultyData);




module.exports = router;
