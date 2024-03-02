// const sequelize = require("../../../config/db");
const passport = require("passport");

const { AuthManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");

const login = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/login",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/register",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};
const dashboard = async (req, res, next) => {
  try {
    // const allHostel = await new AuthManagement().addAdmission(req, res, next);
    return res.render("admin/dashboard");
  } catch (error) {
    next(error);
  }
};
const getDashboardDataBySchool = async (req, res, next) => {
  try {
    const data = await new AuthManagement().getDashboardDataBySchool(req, res);
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
    console.log("thhhhh");
    console.log(req.body.type);
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
  login,register,createSchool,postLogin,logout,dashboard,getDashboardDataBySchool
 
};
