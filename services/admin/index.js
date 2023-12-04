const {LeaveTrackerManagement} = require('./leave-tracker');
const {ExamManagement} = require('./exam');
const {AuthManagement} = require('./auth');
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
const {ClassesManagement} = require('./classes');
const {SubjectManagement} = require('./subject');

module.exports = {
    LeaveTrackerManagement,ExamManagement,FeedbackManagement,DownloadManagement,FinancialManagement,AttendanceManagement,TestManagement,
    AdmissionManagement,HolidayManagement,ComplaintManagement,FacultyManagement,ReportManagement,CalenderManagement,AuthManagement,ClassesManagement,SubjectManagement
   
}