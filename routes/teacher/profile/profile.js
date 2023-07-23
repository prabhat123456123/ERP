const express = require("express");
const router = express.Router();

 
const {
  getProfile,
 
} = require("../../../controller/teacher");


router.get("/get-profile", getProfile);




module.exports = router;
