const express = require("express");
const router = express.Router();
const {checkPaymentStatus} = require("../../../helper/auth");
 
const {
  login,register,createSchool,postLogin,logout,dashboard,getDashboardDataBySchool,payment,submitPayment,paymentSuccess
} = require("../../../controller/admin");

router.get("/", login);
router.get("/payment",checkPaymentStatus(), payment);
router.get("/payment-success", paymentSuccess);
router.post("/submit-payment",checkPaymentStatus(), submitPayment);
router.post("/", postLogin);
router.get("/logout", logout);
router.get("/register", register);
router.get("/dashboard", dashboard);
router.post("/get-dashboard-data-by-school", getDashboardDataBySchool);
router.post("/create-school", createSchool);


module.exports = router;
