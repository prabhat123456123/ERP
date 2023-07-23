// const sequelize = require("../../../config/db");
const { FacultyManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const viewFaculty = async (req, res, next) => {
  try {
    return res.render("admin/faculty/faculty");

  } catch (error) {
    next(error);
  }
};




module.exports = {
 viewFaculty
 
};
