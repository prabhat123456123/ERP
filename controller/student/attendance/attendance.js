// const sequelize = require("../../../config/db");
const { AttendanceManagement } = require("../../../services/student");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const getStudent = async (req, res, next) => {
  try {
    const adm = await new AttendanceManagement().getStudent(req.body);
    //  const count = await new AttendanceManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data");
  } catch (error) {
    next(error);
  }
};












module.exports = {
 getStudent
};
