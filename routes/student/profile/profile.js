const express = require("express");
const router = express.Router();

 
const {
  getProfile,saveProfile,editProfile,updateProfile
 
} = require("../../../controller/student");


router.get("/get-profile", getProfile);

router.post("/save-profile", saveProfile);
router.get("/edit-profile", editProfile);
router.post("/update-profile", updateProfile);



module.exports = router;
