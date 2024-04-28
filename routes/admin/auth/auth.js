const express = require("express");
const router = express.Router();
const {checkPaymentStatus} = require("../../../helper/auth");
 
const {
  login,register,createSchool,postLogin,logout,dashboard,getDashboardDataBySchool,payment,submitPayment,paymentSuccess,createOrder,fetchClassBySchool,createStudentOutside,createFacultyOutside
} = require("../../../controller/admin");

router.get("/", login);
router.get("/payment",checkPaymentStatus(), payment);
router.get("/payment-success/:id", paymentSuccess);
router.post("/submit-payment",checkPaymentStatus(), submitPayment);
router.post("/create-order",checkPaymentStatus(), createOrder);
router.post("/", postLogin);
router.get("/logout", logout);
router.get("/register", register);
router.get("/dashboard", dashboard);
router.post("/get-dashboard-data-by-school", getDashboardDataBySchool);
router.post("/fetch-class-by-school", fetchClassBySchool);
router.post("/create-school", createSchool);
router.post("/create-student-outside", createStudentOutside);
router.post("/create-faculty-outside", createFacultyOutside);


module.exports = router;
