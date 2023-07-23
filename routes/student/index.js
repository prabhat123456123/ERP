const express = require("express");
const app = express();


const { auth } = require("./auth");
const { attendance } = require("./attendance");
const { profile } = require("./profile");
const { report } = require("./report");
const { feedback } = require("./feedback");
const { quiz } = require("./quiz");


app.use("/", auth);
app.use("/attendance", attendance);
app.use("/feedback", feedback);
app.use("/quiz", quiz);
app.use("/profile", profile);
app.use("/report", report);


module.exports = app;
