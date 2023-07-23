

const express = require("express");
const router = express.Router();

 
const {
  viewDownload
 
} = require("../../../controller/admin");


router.get("/view-download", viewDownload);




module.exports = router;
