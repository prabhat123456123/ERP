// const sequelize = require("../../../config/db");
const { DownloadManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const viewDownload = async (req, res, next) => {
  try {
  return res.render("admin/download/download",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};




module.exports = {
 viewDownload
};
