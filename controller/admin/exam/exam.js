// const sequelize = require("../../../config/db");
const { ExamManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const viewExam = async (req, res, next) => {
  try {
     return res.render("admin/exam/exam");

  } catch (error) {
    next(error);
  }
};




module.exports = {
  viewExam
};
