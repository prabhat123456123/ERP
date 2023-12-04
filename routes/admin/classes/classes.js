const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

  
const {
  addClasses,getClasses,updateClassesById,fetchClassesById,viewClassesById,updateClasses,deleteClasses,deleteMultipleClasses,createClasses
 
} = require("../../../controller/admin");



router.get("/classes",isAuthenticatedUser(), addClasses);
router.post("/get-classes",isAuthenticatedUser(), getClasses);
router.post("/update-classes-by-id", isAuthenticatedUser(), updateClassesById);
router.post("/fetch-classes-byid", isAuthenticatedUser(), fetchClassesById);

router.post("/view-Classes-byid",isAuthenticatedUser(), viewClassesById);
router.post("/update-classes",isAuthenticatedUser(), updateClasses);
router.post("/delete-classes",isAuthenticatedUser(), deleteClasses);
router.post("/delete-multiple-classes",isAuthenticatedUser(), deleteMultipleClasses);
router.post("/create-classes", isAuthenticatedUser(),createClasses);
module.exports = router;
