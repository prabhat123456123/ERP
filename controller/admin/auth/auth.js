// const sequelize = require("../../../config/db");
const passport = require("passport");
const Razorpay = require('razorpay');

const { AuthManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");

var instance = new Razorpay({ key_id: 'rzp_test_WBioRsxhNBW8Bu', key_secret: 'ZUrUSwkwcOBPUcJClF2DMSTi' })



const login = async (req, res, next) => {
  try {
    return res.render("admin/login",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};
const payment = async (req, res, next) => {
  try {
    
    const data = await new AuthManagement().getPaymentStatus(req, res);
    const countStudent = await new AuthManagement().countStudentOfSchool(req, res);
    if (data.length) {
      
      return res.redirect("/admission/admission");
    } else {
       return res.render("admin/payment",{nonce: res.locals.nonce,countStudent:countStudent});
    }
  } catch (error) {
    next(error);
  }
};

const paymentSuccess = async (req, res, next) => {
  try {
   const data = await new AuthManagement().getPaymentDetails(req,res);
    return res.render("admin/payment-success",{data:data});
  } catch (error) {
    next(error);
  }
};

const submitPayment = async (req, res, next) => {
  try {
   
    instance.payments.fetch(req.body.razorpay_payment_id).then(async (paymentDoc) => {
      const data = await new AuthManagement().savePaymentDetails(req,res,paymentDoc);
      return res.send(data);
    })

  } catch (error) {
    next(error);
  }
};
const createOrder = async (req, res, next) => {
  try {

    let option = {
      amount: 50000,
      currency: "INR",
    }
    
    instance.orders.create(option, (err, order) => {
      console.log(order);
      return res.send(order);
  
})

 
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    return res.render("admin/register",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};
const dashboard = async (req, res, next) => {
  try {
    return res.render("admin/dashboard",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};
const getDashboardDataBySchool = async (req, res, next) => {
  try {
    const adm = await new AuthManagement().getDashboardDataBySchool(req,res);
     const count = await new AuthManagement().countDashboardDataBySchool(req,res);
    const data = JSON.stringify({
      draw: parseInt(req.body.draw),
      recordsFiltered: count.length,
      recordsTotal: count.length,
      data: adm.length ? adm : [],
    });
    return data;
  } catch (error) {
    next(error);
  }
};
const createSchool = async (req, res, next) => {
  try {
    const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new AuthManagement().createSchool(
      files,
      fields,
      req,
      res
    );
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const postLogin = async (req, res, next) => {
  try {
 
    if (req.body.type == "school") {
 
      passport.authenticate("school", {
        successRedirect: "/admission/admission",
        failureRedirect: "/",
        failureFlash: true,
      })(req, res, next);

        
 
    } else if (req.body.type == "student") {
      passport.authenticate("student", {
        successRedirect: "/admission/admission",
        failureRedirect: "/",
        failureFlash: true,
      })(req, res, next);
    } else if (req.body.type == "faculty") {
      passport.authenticate("faculty", {
        successRedirect: "/admission/admission",
        failureRedirect: "/",
        failureFlash: true,
      })(req, res, next);
    } else {
      req.flash("error_msg", "you are not permitted to access");
      res.redirect("/");
    }
   
  } catch (error) {
    req.flash(error.message);
    return res.redirect("/");
    // next(error.message);
  }
};

const logout = async (req, res) => {
 
  req.flash("success_msg", "You are loged out");
  req.session.destroy();
  res.redirect("/");
};


module.exports = {
  login,register,createSchool,postLogin,logout,dashboard,getDashboardDataBySchool,paymentSuccess,payment,submitPayment,createOrder
 
};
