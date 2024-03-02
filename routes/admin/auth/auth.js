const express = require("express");
const router = express.Router();

 
const {
  login,register,createSchool,postLogin,logout,dashboard,getDashboardDataBySchool
} = require("../../../controller/admin");

router.get("/", login);
router.post("/", postLogin);
router.get("/logout", logout);
router.get("/register", register);
router.get("/dashboard", dashboard);
router.post("/get-dashboard-data-by-school", getDashboardDataBySchool);
router.post("/create-school", createSchool);


module.exports = router;
