
const {ComplaintManagement} = require('./complaint');

const {ReportManagement} = require('./report');
const {AttendanceManagement} = require('./attendance');
const {AuthManagement} = require('./auth');
const {ProfileManagement} = require('./profile');

module.exports = {
    AuthManagement,ComplaintManagement,ProfileManagement,AttendanceManagement
   ,ReportManagement,
   
}