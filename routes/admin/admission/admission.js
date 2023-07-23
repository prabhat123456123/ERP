const express = require("express");
const router = express.Router();

 
const {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple
  
 
} = require("../../../controller/admin");

router.get("/admission", addAdmission);
router.post("/get-admission", getAdmission);
router.post("/update-admission", updateAdmission);
router.post("/delete-admission", deleteAdmission);
router.post("/delete-multiple", deleteMultiple);


module.exports = router;
