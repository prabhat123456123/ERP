const express = require("express");
const router = express.Router();

 
const {
  register,
 
} = require("../../../controller/student");


router.get("/register", register);




module.exports = router;
