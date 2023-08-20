const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewFaculty,getFacultyData,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,createFaculty,updateFacultyById,fetchFacultyById,viewFacultyById,bulkCreateFaculty,updateFacultyId
 
} = require("../../../controller/admin");


router.get("/view-faculty",isAuthenticatedUser(), viewFaculty);
router.post("/get-faculty",isAuthenticatedUser(), getFacultyData);
router.post("/update-faculty",isAuthenticatedUser(), updateFacultyData);
router.post("/delete-faculty",isAuthenticatedUser(), deleteFacultyData);
router.post("/create-faculty",isAuthenticatedUser(), createFaculty);
router.post("/delete-multiple-faculty",isAuthenticatedUser(), deleteMultipleFacultyData);


router.post("/update-faculty-by-id",isAuthenticatedUser(), updateFacultyById);
router.post("/update-faculty-id",isAuthenticatedUser(), updateFacultyId);
router.post("/fetch-faculty-byid",isAuthenticatedUser(), fetchFacultyById);
router.post("/view-faculty-byid",isAuthenticatedUser(), viewFacultyById);
router.post("/bulk-create-faculty", isAuthenticatedUser(),bulkCreateFaculty);




module.exports = router;
