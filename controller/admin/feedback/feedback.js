// const sequelize = require("../../../config/db");
const { FeedbackManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const viewFeedback = async (req, res, next) => {
  try {
   return res.render("admin/feedback/feedback");

  } catch (error) {
    next(error);
  }
};




module.exports = {
 viewFeedback
 
};
