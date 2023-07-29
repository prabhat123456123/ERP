

const {
  register,login
 
} = require("./auth");

const {
getStudent
} = require("./attendance");

const {
  getQuiz,singleQuiz
} = require("./quiz");

const {
 getProfile,saveProfile,editProfile,updateProfile
} = require("./profile");




const {
 saveFeedback,getFeedback,editFeedback,updateFeedback,deleteFeedback
} = require("./feedback");


const {
getReport
} = require("./report");


module.exports = {
   register, getQuiz,login,saveProfile,editProfile,updateProfile,
  getProfile, saveFeedback,getFeedback,editFeedback,updateFeedback,deleteFeedback, getReport,
getStudent,singleQuiz
};
