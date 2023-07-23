const express = require("express");
const router = express.Router();

 
const {
  viewFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleFaculty
 
} = require("../../../controller/admin");


router.get("/view-faculty", viewFaculty);
router.post("/get-faculty", getFaculty);
router.post("/update-faculty", updateFaculty);
router.post("/delete-faculty", deleteFaculty);
router.post("/delete-multiple-faculty", deleteMultipleFaculty);




module.exports = router;
