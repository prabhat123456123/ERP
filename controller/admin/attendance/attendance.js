// const sequelize = require("../../../config/db");
const { AttendanceManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const attendanceStudent = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().getClass(req);
    return res.render("admin/attendance/attendance-student",{data:data});
  } catch (error) {
    next(error);
  }
};
const getStudent = async (req, res, next) => {
  try {
    const adm = await new AttendanceManagement().getStudent(req,res);
     const count = await new AttendanceManagement().countStudent(req,res);
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
      const data = await new AttendanceManagement().getFacultyBySchool(req);
    return res.render("admin/attendance/attendance-faculty",{data:data});
  } catch (error) {
    next(error);
  }
};
const getFaculty = async (req, res, next) => {
  try {
    const adm = await new AttendanceManagement().getFaculty(req,res);
     const count = await new AttendanceManagement().countFaculty(req,res);
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

const checkinStudentAttendance = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().checkinStudentAttendance(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const checkoutStudentAttendance = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().checkoutStudentAttendance(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getStudentAttendanceReport = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().getStudentAttendanceReport(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const checkinFacultyAttendance = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().checkinFacultyAttendance(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const checkoutFacultyAttendance = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().checkoutFacultyAttendance(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getFacultyAttendanceReport = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().getFacultyAttendanceReport(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const getReportByStudent = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().getReportByStudent(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getReportByFaculty = async (req, res, next) => {
  try {
    const data = await new AttendanceManagement().getReportByFaculty(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};



module.exports = {
 attendanceStudent,attendanceFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,checkinStudentAttendance,checkoutStudentAttendance,getStudentAttendanceReport,checkinFacultyAttendance,checkoutFacultyAttendance,getFacultyAttendanceReport,getReportByStudent,getReportByFaculty
};
