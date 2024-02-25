// const sequelize = require("../../../config/db");
const { ReportManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const reportStudent = async (req, res, next) => {
  try {
      const data = await new ReportManagement().getClass(req);
   return res.render("admin/report/report-student",{nonce: res.locals.nonce,data:data});
  } catch (error) {
    next(error);
  }
};

const reportFaculty = async (req, res, next) => {
  try {
   return res.render("admin/report/report-faculty",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const fetchStudentByClass = async (req, res, next) => {
  try {
    const data = await new ReportManagement().fetchStudentByClass(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};
const fetchStudentReportByClass = async (req, res, next) => {
  try {
    const data = await new ReportManagement().fetchStudentReportByClass(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};



module.exports = {
 reportStudent,reportFaculty,fetchStudentByClass,fetchStudentReportByClass
 
};
