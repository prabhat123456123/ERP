
const {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById,createStudent,viewStudentById
 
} = require("./admission");

const {
  login,register,createSchool,postLogin,logout
 
} = require("./auth");

const {
 attendanceStudent,attendanceFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,
} = require("./attendance");

const {
  admitCard
} = require("./academic");

const {
 viewExam
} = require("./exam");

const {
 financialStudent,financialFaculty
} = require("./financial");

const {
viewCalender
} = require("./calender");

const {
  viewDownload
} = require("./download");

const {
 viewFaculty,createFaculty,getFacultyData,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData
} = require("./faculty");

const {
 viewComplaint,getComplaint
} = require("./complaint");

const {
 viewFeedback
} = require("./feedback");

const {
 viewHoliday
} = require("./holiday");

const {
 reportStudent,reportFaculty
} = require("./report");

const {
  onlineTest,practiceTest
 
} = require("./test-series");

module.exports = {
  addAdmission, attendanceStudent, attendanceFaculty,getComplaint, reportStudent,reportFaculty,viewStudentById, financialStudent, financialFaculty, viewCalender,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,
  viewHoliday, viewComplaint, viewDownload, viewExam, viewFaculty, viewFeedback,postLogin, login, register, getAdmission,createSchool,createStudent,
  updateAdmission, deleteAdmission,logout, deleteMultiple, onlineTest, practiceTest, admitCard,fetchStudentById,updateStudentById,createFaculty,
  getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,getFacultyData
};
