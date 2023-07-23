// const sequelize = require("../../../config/db");
const { AuthManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");

const login = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/login");
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/register");
  } catch (error) {
    next(error);
  }
};




module.exports = {
  login,register
 
};
