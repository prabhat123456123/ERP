const express = require("express");
const router = express.Router();

 
const {
  saveFeedback,getFeedback,editFeedback,updateFeedback,deleteFeedback
 
} = require("../../../controller/student");


router.post("/save-feedback", saveFeedback);
router.get("/get-feedback", getFeedback);
router.get("/edit-feedback", editFeedback);
router.post("/update-feedback", updateFeedback);
router.post("/delete-feedback", deleteFeedback);




module.exports = router;
