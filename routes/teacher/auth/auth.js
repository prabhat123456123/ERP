const express = require("express");
const router = express.Router();

 
const {
  register,
 
} = require("../../../controller/teacher");


router.get("/register", register);




module.exports = router;
