const express = require("express");
const app = express();


const { auth } = require("./auth");
const { attendance } = require("./attendance");
const { complaint } = require("./complaint");
const { profile } = require("./profile");
const { report } = require("./report");


app.use("/", auth);
app.use("/attendance", attendance);
app.use("/complaint", complaint);
app.use("/profile", profile);
app.use("/report", report);


module.exports = app;
