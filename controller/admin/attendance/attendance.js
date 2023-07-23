// const sequelize = require("../../../config/db");
const { AttendanceManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const attendanceStudent = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/attendance/attendance-student");
  } catch (error) {
    next(error);
  }
};
const getStudent = async (req, res, next) => {
  try {
    const adm = await new AttendanceManagement().getStudent(req.body);
     const count = await new AttendanceManagement().countStudent(req.body);
    const data = JSON.stringify({
      draw: parseInt(req.body.draw),
      recordsFiltered: count.length,
      recordsTotal: count.length,
      data: adm.length ? adm : [],
    });
     console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const updateStudent = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().updateStudent(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().deleteStudent(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleStudent = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().deleteMultipleStudent(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const attendanceFaculty = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/attendance/attendance-faculty");
  } catch (error) {
    next(error);
  }
};
const getFaculty = async (req, res, next) => {
  try {
    const adm = await new AttendanceManagement().getFaculty(req.body);
     const count = await new AttendanceManagement().countFaculty(req.body);
    const data = JSON.stringify({
      draw: parseInt(req.body.draw),
      recordsFiltered: count.length,
      recordsTotal: count.length,
      data: adm.length ? adm : [],
    });
     console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const updateFaculty = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().updateFaculty(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteFaculty = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().deleteFaculty(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleFaculty = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().deleteMultipleFaculty(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};




module.exports = {
 attendanceStudent,attendanceFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,
};
