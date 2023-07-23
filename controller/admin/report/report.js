// const sequelize = require("../../../config/db");
const { ReportManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const reportStudent = async (req, res, next) => {
  try {
   return res.render("admin/report/report-student");
  } catch (error) {
    next(error);
  }
};

const reportFaculty = async (req, res, next) => {
  try {
   return res.render("admin/report/report-faculty");
  } catch (error) {
    next(error);
  }
};





module.exports = {
 reportStudent,reportFaculty
 
};
