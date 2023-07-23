
const {FeedbackManagement} = require('./feedback');

const {ReportManagement} = require('./report');
const {AttendanceManagement} = require('./attendance');
const {AuthManagement} = require('./auth');
const {ProfileManagement} = require('./profile');
const {QuizManagement} = require('./quiz');

module.exports = {
    AuthManagement,FeedbackManagement,ProfileManagement,AttendanceManagement,QuizManagement
   ,ReportManagement,
   
}