
const {
  addAdmission,getAdmission,updateAdmissionById,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById,createStudent,viewStudentById,bulkCreateStudent,exportExcel,exportPdf
 
} = require("./admission");

const {
addClasses,getClasses,updateClassesById,fetchClassesById,viewClassesById,updateClasses,deleteClasses,deleteMultipleClasses,createClasses
 
} = require("./classes");

const {
addSubject,getSubject,updateSubjectById,fetchSubjectById,viewSubjectById,updateSubject,deleteSubject,deleteMultipleSubject,createSubject
 
} = require("./subject");

const {
  login,register,createSchool,postLogin,logout,dashboard,getDashboardDataBySchool,payment,submitPayment,paymentSuccess,createOrder,fetchClassBySchool,createStudentOutside,createFacultyOutside
 
} = require("./auth");

const {
 attendanceStudent,attendanceFaculty,getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,getStudent,updateStudent,deleteStudent,checkinStudentAttendance,checkoutStudentAttendance,getStudentAttendanceReport,checkinFacultyAttendance,checkoutFacultyAttendance,getFacultyAttendanceReport,getReportByStudent,getReportByFaculty
} = require("./attendance");

const {
  leaveStudentTracker,leaveFacultyTracker,getStudentLeave,updateStudentLeaveById,fetchStudentLeaveById,viewStudentLeaveById,updateStudentLeave,deleteStudentLeave,deleteStudentMultipleLeave,createStudentLeave,getFacultyLeave,updateFacultyLeaveById,fetchFacultyLeaveById,viewFacultyLeaveById,updateFacultyLeave,deleteFacultyLeave,deleteFacultyMultipleLeave,createFacultyLeave
} = require("./leave-tracker");

const {
  viewExam, getExam, updateExamById, fetchExamById, viewExamById, examWiseQuestion, updateExam, deleteExam, deleteMultipleExam, createExam
  ,getQuestion,updateQuestionById,fetchQuestionById,viewQuestionById,updateQuestion,deleteQuestion,deleteMultipleQuestion,createQuestion,subjectMarks,getSubjectMarks,updateSubjectMarksById,fetchSubjectMarksById,viewSubjectMarksById,updateSubjectMarks,deleteSubjectMarks,deleteMultipleSubjectMarks,createSubjectMarks,fetchStudentAndSubjectByClass,assignExam
} = require("./exam");

const {
addStudentFinancial,getStudentFinancial,addFacultyFinancial,getFacultyFinancial,viewStudentFeeDetails,viewFacultyFeeDetails,
} = require("./financial");

const {
viewCalender
} = require("./calender");

const {
  viewDownload
} = require("./download");

const {
 viewFaculty,createFaculty,getFacultyData,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,updateFacultyById,fetchFacultyById,viewFacultyById,bulkCreateFaculty
} = require("./faculty");

const {
 viewComplaint,getComplaint,updateComplaintById,fetchComplaintById,viewComplaintById,deleteComplaint,deleteMultipleComplaint,createComplaint,addComplaintById
} = require("./complaint");

const {
 viewFeedback,getFeedback,updateFeedbackById,addFeedbackById,fetchFeedbackById,viewFeedbackById,deleteFeedback,deleteMultipleFeedback,createFeedback
} = require("./feedback");

const {
 viewHoliday
} = require("./holiday");

const {
 reportStudent,reportFaculty,fetchStudentByClass,fetchStudentReportByClass,getCertificate,updateCertificateById,fetchCertificateById,viewCertificateById,deleteCertificate,deleteMultipleCertificate,createCertificate,certificateRender,getClass,assignCertificate
} = require("./report");

const {
  onlineTest,FullLengthTest,QuizTest,PracticeTest,getNewFulllengthTest,getCompletedFulllengthTest,getCompletedPracticeTest,getNewPracticeTest,getNewQuizTest,getCompletedQuizTest,viewExplaination,getQuestionExamWise,getFullLengthQuestion,getQuestionByIndex,getPracticeQuestion,getQuizQuestion,submitExam,saveNextQuestion,getAnsweredNotAnswered
 
} = require("./test-series");

module.exports = {
  addAdmission, attendanceStudent, attendanceFaculty,getComplaint, reportStudent,reportFaculty,viewStudentById,addStudentFinancial,getStudentFinancial,addFacultyFinancial,getFacultyFinancial,viewStudentFeeDetails,viewFacultyFeeDetails, viewCalender,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,getStudentLeave,updateStudentLeaveById,fetchStudentLeaveById,viewStudentLeaveById,updateStudentLeave,deleteStudentLeave,deleteStudentMultipleLeave,createStudentLeave,getFacultyLeave,updateFacultyLeaveById,fetchFacultyLeaveById,viewFacultyLeaveById,updateFacultyLeave,deleteFacultyLeave,deleteFacultyMultipleLeave,createFacultyLeave,
  viewHoliday, viewComplaint, viewDownload, viewExam, viewFaculty, viewFeedback,postLogin, login, register, getAdmission,createSchool,createStudent,bulkCreateStudent,exportExcel,exportPdf,getFeedback,addFeedbackById,viewExplaination,getQuestionExamWise,
  updateAdmission, deleteAdmission,logout, deleteMultiple, onlineTest,FullLengthTest,QuizTest,PracticeTest, leaveStudentTracker,leaveFacultyTracker,fetchStudentById,updateStudentById,createFaculty,updateFacultyById,fetchFacultyById,viewFacultyById,bulkCreateFaculty,updateFeedbackById,fetchFeedbackById,viewFeedbackById,deleteFeedback,deleteMultipleFeedback,createFeedback,addComplaintById,getNewFulllengthTest,getCompletedFulllengthTest,getCompletedPracticeTest,getNewPracticeTest,getNewQuizTest,getCompletedQuizTest,getFullLengthQuestion,getPracticeQuestion,getQuizQuestion,getQuestionByIndex,submitExam,saveNextQuestion,
  getFaculty,updateFaculty,deleteFaculty,deleteMultipleStudent,deleteMultipleFaculty,updateAdmissionById,getStudent,updateStudent,deleteStudent,getFacultyData,getExam,updateExamById,fetchExamById,viewExamById,examWiseQuestion,updateExam,deleteExam,deleteMultipleExam,createExam,updateComplaintById,fetchComplaintById,viewComplaintById,deleteComplaint,deleteMultipleComplaint,createComplaint,getQuestion,updateQuestionById,fetchQuestionById,viewQuestionById,updateQuestion,deleteQuestion,deleteMultipleQuestion,createQuestion,addClasses,getClasses,updateClassesById,fetchClassesById,viewClassesById,updateClasses,deleteClasses,deleteMultipleClasses,createClasses,addSubject,getSubject,updateSubjectById,fetchSubjectById,viewSubjectById,updateSubject,deleteSubject,deleteMultipleSubject,createSubject,subjectMarks,getSubjectMarks,updateSubjectMarksById,fetchSubjectMarksById,viewSubjectMarksById,updateSubjectMarks,deleteSubjectMarks,deleteMultipleSubjectMarks,createSubjectMarks,fetchStudentAndSubjectByClass,fetchStudentByClass,fetchStudentReportByClass,checkinStudentAttendance,checkoutStudentAttendance,getStudentAttendanceReport,checkinFacultyAttendance,checkoutFacultyAttendance,getFacultyAttendanceReport,getReportByStudent,getReportByFaculty,dashboard,getDashboardDataBySchool,getAnsweredNotAnswered,payment,submitPayment,paymentSuccess,createOrder,getCertificate,updateCertificateById,fetchCertificateById,viewCertificateById,deleteCertificate,deleteMultipleCertificate,createCertificate,certificateRender,fetchClassBySchool,createStudentOutside,createFacultyOutside,getClass,assignCertificate,assignExam
};
