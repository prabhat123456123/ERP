

const {
  register
 
} = require("./auth");

const {
getStudent
} = require("./attendance");

const {
  getQuiz
} = require("./quiz");

const {
 getProfile
} = require("./profile");




const {
 feedback
} = require("./feedback");


const {
getReport
} = require("./report");


module.exports = {
   register, getQuiz,
  getProfile, feedback, getReport,
getStudent
};
