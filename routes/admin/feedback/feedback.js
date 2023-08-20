

const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
  viewFeedback,getFeedback,updateFeedbackById,fetchFeedbackById,viewFeedbackById,deleteFeedback,deleteMultipleFeedback,createFeedback,addFeedbackById
 
} = require("../../../controller/admin");


router.get("/view-feedback", isAuthenticatedUser(),viewFeedback);
router.post("/get-feedback",isAuthenticatedUser(), getFeedback);

router.post("/update-feedback-by-id",isAuthenticatedUser(), updateFeedbackById);
router.post("/add-feedback-by-id",isAuthenticatedUser(), addFeedbackById);
router.post("/fetch-feedback-byid",isAuthenticatedUser(), fetchFeedbackById);
router.post("/view-feedback-byid",isAuthenticatedUser(), viewFeedbackById);
router.post("/delete-feedback",isAuthenticatedUser(), deleteFeedback);
router.post("/delete-multiple-feedback",isAuthenticatedUser(), deleteMultipleFeedback);
router.post("/create-feedback", isAuthenticatedUser(),createFeedback);



module.exports = router;
