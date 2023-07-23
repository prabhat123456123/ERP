const express = require("express");
const router = express.Router();

 
const {
  getProfile,
 
} = require("../../../controller/student");


router.get("/get-profile", getProfile);




module.exports = router;
