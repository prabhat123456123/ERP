const express = require("express");
const app = express();

const { admission } = require("./admission");
const { classes } = require("./classes");
const { subject } = require("./subject");
const { auth } = require("./auth");
const { exam } = require("./exam");
const { financial } = require("./financial");
const { leaveTracker } = require("./leave-tracker");
const { attendance } = require("./attendance");
const { complaint } = require("./complaint");
const { feedback } = require("./feedback");
const { report } = require("./report");
const { holiday } = require("./holiday");
const { download } = require("./download");
const { testseries } = require("./test-series");
const { faculty } = require("./faculty");
const { calender } = require("./calender");


app.use("/", auth);
app.use("/admission", admission);
app.use("/classes", classes);
app.use("/subject", subject);
app.use("/exam", exam);
app.use("/financial", financial);
app.use("/leave", leaveTracker);
app.use("/attendance", attendance);
app.use("/complaint", complaint);
app.use("/feedback", feedback);
app.use("/report", report);
app.use("/holiday", holiday);
app.use("/download", download);
app.use("/test-series", testseries);
app.use("/faculty", faculty);
app.use("/calender", calender);


module.exports = app;
