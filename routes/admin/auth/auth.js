const express = require("express");
const router = express.Router();

 
const {
  login,register,createSchool,postLogin,logout
} = require("../../../controller/admin");

router.get("/", login);
router.post("/", postLogin);
router.get("/logout", logout);
router.get("/register", register);
router.post("/create-school", createSchool);


module.exports = router;
