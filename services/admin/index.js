const {AcademicManagement} = require('./academic');
const {ExamManagement} = require('./exam');
const {HolidayManagement} = require('./holiday');
const {FeedbackManagement} = require('./feedback');
const {ComplaintManagement} = require('./complaint');
const {DownloadManagement} = require('./download');
const {FacultyManagement} = require('./faculty');
const {FinancialManagement} = require('./financial');
const {ReportManagement} = require('./report');
const {AttendanceManagement} = require('./attendance');
const {CalenderManagement} = require('./calender');
const {TestManagement} = require('./test-series');
const {AdmissionManagement} = require('./admission');

module.exports = {
    AcademicManagement,ExamManagement,FeedbackManagement,DownloadManagement,FinancialManagement,AttendanceManagement,TestManagement,
    AdmissionManagement,HolidayManagement,ComplaintManagement,FacultyManagement,ReportManagement,CalenderManagement,
   
}