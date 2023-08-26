

// const sequelize = require("../../../config/db");
const { LeaveTrackerManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");

const leaveTracker = async (req, res, next) => {
  try {
    // const allHostel = await new LeaveTrackerManagement().addAdmission(req, res, next);
    return res.render("admin/academic/academic");
  } catch (error) {
    next(error);
  }
};
// const getAdmission = async (req, res, next) => {
//   try {
//     const adm = await new AcademicManagement().getAdmission(req.body);
//      const count = await new AcademicManagement().countStudent(req.body);
//     const data = JSON.stringify({
//       draw: parseInt(req.body.draw),
//       recordsFiltered: count.length,
//       recordsTotal: count.length,
//       data: adm.length ? adm : [],
//     });
//      console.log(data)
//     return res.send(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const updateAdmission = async (req, res, next) => {
//   try {
//     const data = await new AdmissionManagement().updateAdmission(req.body);
   
//     //  console.log(data)
//     return res.send(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const deleteAdmission = async (req, res, next) => {
//   try {
//     const data = await new AdmissionManagement().deleteAdmission(req.body);
   
//     //  console.log(data)
//     return res.send(data);
//   } catch (error) {
//     next(error);
//   }
// };
// const deleteMultiple = async (req, res, next) => {
//   try {
//     const data = await new AdmissionManagement().deleteMultiple(req.body);
   
//     //  console.log(data)
//     return res.send(data);
//   } catch (error) {
//     next(error);
//   }
// };




module.exports = {
  leaveTracker
 
};
