const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
db = {};
db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.Answer = require("./answer")(sequelize, DataTypes, Model);
db.Class = require("./class")(sequelize, DataTypes, Model);
db.Complaint = require("./complaint")(sequelize, DataTypes, Model);
db.Downloadcenter = require("./download_center")(sequelize, DataTypes, Model);
db.Exam = require("./exam")(sequelize, DataTypes, Model);
db.Examstatus = require("./exam_status")(sequelize, DataTypes, Model);
db.Facultyattendance = require("./faculty_attendance")(sequelize, DataTypes, Model);
db.Facultyfinancial = require("./faculty_financial")(sequelize, DataTypes, Model);
db.Facultyleave = require("./faculty_leave")(sequelize, DataTypes, Model);
db.Facultypayment = require("./faculty_payment")(sequelize, DataTypes, Model);
db.Faculty = require("./faculty")(sequelize, DataTypes, Model);
db.Feedback = require("./feedback")(sequelize, DataTypes, Model);
db.Holiday = require("./holiday")(sequelize, DataTypes, Model);
db.Noticeboard = require("./notice_board")(sequelize, DataTypes, Model);
db.Question = require("./question")(sequelize, DataTypes, Model);
db.Result = require("./result")(sequelize, DataTypes, Model);
db.Schoolpayment = require("./school_payment")(sequelize, DataTypes, Model);
db.School = require("./school")(sequelize, DataTypes, Model);
db.Studentattendance = require("./student_attendance")(sequelize, DataTypes, Model);
db.Studentfinancial = require("./student_financial")(sequelize, DataTypes, Model);
db.Studentleave = require("./student_leave")(sequelize, DataTypes, Model);
db.Studentpayment = require("./student_payment")(sequelize, DataTypes, Model);
db.Student = require("./student")(sequelize, DataTypes, Model);
db.Subject = require("./subject")(sequelize, DataTypes, Model);
db.Subjectmarks = require("./subject_marks")(sequelize, DataTypes, Model);
db.Certificate = require("./certificate")(sequelize, DataTypes, Model);
db.Certificatestatus = require("./certificate_status")(sequelize, DataTypes, Model);

db.sequelize
  .sync({logging:false,force:false})
  .then(() => {
    console.log("Database Connected");

  })
  .catch((err) => {
    throw err;
  });
module.exports = db;
