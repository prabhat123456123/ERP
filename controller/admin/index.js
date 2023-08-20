
const {
  addAdmission,getAdmission,updateAdmissionById,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById,createStudent,viewStudentById,bulkCreateStudent,exportExcel,exportPdf
 
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
 viewExam,getExam,updateExamById,fetchExamById,viewExamById,updateExamId,updateExam,deleteExam,deleteMultipleExam,createExam
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
 viewFaculty,createFaculty,getFacultyData,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,updateFacultyById,fetchFacultyById,viewFacultyById,bulkCreateFaculty,updateFacultyId
} = require("./faculty");

const {
 viewComplaint,getComplaint,updateComplaintById,fetchComplaintById,viewComplaintById,deleteComplaint,deleteMultipleComplaint,createComplaint,addComplaintById
} = require("./complaint");

const {
 viewFeedback,getFeedback,updateFeedbackById,fetchFeedbackById,viewFeedbackById,deleteFeedback,deleteMultipleFeedback,createFeedback
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
  viewHoliday, viewComplaint, viewDownload, viewExam, viewFaculty, viewFeedback,postLogin, login, register, getAdmission,createSchool,createStudent,bulkCreateStudent,exportExcel,exportPdf,updateFacultyId,getFeedback,addFeedbackById,
  updateAdmission, deleteAdmission,logout, deleteMultiple, onlineTest, practiceTest, admitCard,fetchStudentById,updateStudentById,createFaculty,updateFacultyById,fetchFacultyById,viewFacultyById,bulkCreateFaculty,updateFeedbackById,fetchFeedbackById,viewFeedbackById,deleteFeedback,deleteMultipleFeedback,createFeedback,addComplaintById,
  getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,updateAdmissionById,getStudent,updateStudent,deleteStudent,getFacultyData,getExam,updateExamById,fetchExamById,viewExamById,updateExamId,updateExam,deleteExam,deleteMultipleExam,createExam,updateComplaintById,fetchComplaintById,viewComplaintById,deleteComplaint,deleteMultipleComplaint,createComplaint
};
