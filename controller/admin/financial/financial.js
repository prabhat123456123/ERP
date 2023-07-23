// const sequelize = require("../../../config/db");
const { FinancialManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const financialStudent = async (req, res, next) => {
  try {
     return res.render("admin/financial/financial-student");

  } catch (error) {
    next(error);
  }
};
const financialFaculty = async (req, res, next) => {
  try {
        return res.render("admin/financial/financial-faculty");

  } catch (error) {
    next(error);
  }
};




module.exports = {
 financialStudent,financialFaculty
 
};
