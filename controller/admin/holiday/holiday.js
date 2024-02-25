// const sequelize = require("../../../config/db");
const { HolidayManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const viewHoliday = async (req, res, next) => {
  try {
         return res.render("admin/holiday/holiday",{nonce: res.locals.nonce});

  } catch (error) {
    next(error);
  }
};





module.exports = {
 viewHoliday
 
};
