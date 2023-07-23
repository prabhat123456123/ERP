
const {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple
 
} = require("./admission");

const {
  login,register
 
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
 viewFaculty
} = require("./faculty");

const {
 viewComplaint
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
  addAdmission, attendanceStudent, attendanceFaculty, reportStudent,reportFaculty, financialStudent, financialFaculty, viewCalender,
  viewHoliday, viewComplaint, viewDownload, viewExam, viewFaculty, viewFeedback, login, register, getAdmission,
  updateAdmission, deleteAdmission, deleteMultiple, onlineTest, practiceTest, admitCard,
  getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,
};
