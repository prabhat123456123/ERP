// const sequelize = require("../../../config/db");
const { ComplaintManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const viewComplaint = async (req, res, next) => {
  try {
     return res.render("admin/complaint/complaint");
  } catch (error) {
    next(error);
  }
};




module.exports = {
 viewComplaint
 
};
