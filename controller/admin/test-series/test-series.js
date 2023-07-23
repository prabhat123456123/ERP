// const sequelize = require("../../../config/db");
const { TestManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");

const onlineTest = async (req, res, next) => {
  try {
   
    return res.render("admin/test-series/online-test");
  } catch (error) {
    next(error);
  }
};
const practiceTest = async (req, res, next) => {
  try {
    return res.render("admin/test-series/practice-test");
  } catch (error) {
    next(error);
  }
};





module.exports = {
 onlineTest,practiceTest
 
};
