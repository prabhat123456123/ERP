

const express = require("express");
const router = express.Router();

 
const {
  viewFeedback
 
} = require("../../../controller/admin");


router.get("/view-feedback", viewFeedback);




module.exports = router;
