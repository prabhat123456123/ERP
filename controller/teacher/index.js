

const {
  register,login
 
} = require("./auth");

const {
getStudent
} = require("./attendance");


const {
 getProfile,saveProfile,editProfile,updateProfile
} = require("./profile");




const {
 getComplaint,saveComplaint,editComplaint,updateComplaint,deleteComplaint,
} = require("./complaint");


const {
getReport
} = require("./report");


module.exports = {
   register,saveComplaint,editComplaint,updateComplaint,deleteComplaint,
  getProfile, getComplaint, getReport,login,
getStudent,saveProfile,editProfile,updateProfile
};
