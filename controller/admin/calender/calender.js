// const sequelize = require("../../../config/db");
const { CalenderManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const viewCalender = async (req, res, next) => {
  try {
      return res.render("admin/calender/calender",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};




module.exports = {
 viewCalender
};
