
const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewComplaint,getComplaint,updateComplaintById,fetchComplaintById,viewComplaintById,deleteComplaint,deleteMultipleComplaint,createComplaint,addComplaintById
 
} = require("../../../controller/admin");


router.get("/view-complaint",isAuthenticatedUser(), viewComplaint);
router.post("/get-complaint",isAuthenticatedUser(), getComplaint);


router.post("/update-complaint-by-id",isAuthenticatedUser(), updateComplaintById);
router.post("/add-complaint-by-id",isAuthenticatedUser(), addComplaintById);
router.post("/fetch-complaint-byid",isAuthenticatedUser(), fetchComplaintById);
router.post("/view-complaint-byid",isAuthenticatedUser(), viewComplaintById);
router.post("/delete-complaint",isAuthenticatedUser(), deleteComplaint);
router.post("/delete-multiple-complaint",isAuthenticatedUser(), deleteMultipleComplaint);
router.post("/create-complaint", isAuthenticatedUser(),createComplaint);


module.exports = router;
