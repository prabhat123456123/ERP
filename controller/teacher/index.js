

const {
  register
 
} = require("./auth");

const {
getStudent
} = require("./attendance");


const {
 getProfile
} = require("./profile");




const {
 getComplaint
} = require("./complaint");


const {
getReport
} = require("./report");


module.exports = {
   register,
  getProfile, getComplaint, getReport,
getStudent
};
