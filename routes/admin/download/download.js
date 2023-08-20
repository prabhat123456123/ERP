

const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewDownload
 
} = require("../../../controller/admin");


router.get("/view-download", viewDownload);




module.exports = router;
