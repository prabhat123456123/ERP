const sequelize = require("../../../config/database");
const { QueryTypes, Sequelize } = require("sequelize");
const {
 calculateNextDateTime
} = require("../../../helper/calculate-time");
const {
  copyFiles,
  getDate,
  generateRandomPassword,
  hashPassword,
  addDate,
} = require("../../../utils");
// var FormData = require("form-data");
// let {uploadDocument} = require("../../utils/upload");
const { v4: uuidv4 } = require("uuid");
// const humps = require("humps");

const path = require("path");
const moment = require("moment");
// const { application } = require("express");
const { FORMERR } = require("dns");
const { Console, log } = require("console");
// const { Review: ReviewFc } = require("./fc");
const axios = require("axios");
const fs = require("fs");
// const pdf = require("pdf-creator-node");

// const { SERVER_ERROR, BAD_GATEWAY } = statusCodes;

const BASEURL = process.env.BASEURL;

class AuthManagement {
  constructor() {}
async createStudentOutside(files, fields, req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");
      const userExist = await sequelize.query(
        "SELECT * FROM student WHERE email =? OR phone=?",
        {
          replacements: [fields.student_email[0], fields.student_phone[0]],
          type: QueryTypes.SELECT,
        }
      );

      if (userExist.length > 0) {
        return false;
      } else {
       
       
        const password = await generateRandomPassword();
        const genratedPassword = await hashPassword(password);

        const uniqueNum = uuidv4();
        const dir = path.join(
          __dirname,
          `../../../public/uploads/student/${fields.student_email[0]}`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.student_photo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.student_photo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

        const data = await sequelize.query(
          "INSERT INTO student(track_id,role,name,email,dob,gender,phone,track_class_id,track_school_id,address,fathers_name,mothers_name,parent_phone,hobby,password,photo,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              "student",
              fields.student_name[0],
              fields.student_email[0],
              fields.student_dob[0],
              fields.student_gender[0],
              fields.student_phone[0],
              fields.student_class_id[0],
              fields.student_school_id[0],
              fields.student_address[0],
              fields.student_father_name[0],
              fields.student_mother_name[0],
              fields.student_parent_phone[0],
              fields.student_hobbies[0],
              genratedPassword,
              url,
          "STUDENT",
               currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
        // await sendEmail("prabhatpandey181291@gmail.com", "test", "lol");
        return true;
      }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 async createFacultyOutside(files, fields, req, res) {
    try {

      const currentTime = getDate("YYYY-MM-DD hh:mm");

      const userExist = await sequelize.query(
        "SELECT * FROM faculty WHERE email =? OR phone=?",
        {
          replacements: [fields.email[0], fields.phone[0]],
          type: QueryTypes.SELECT,
        }
      );

      if (userExist.length > 0) {
        return false;
      } else {
        
        const password = await generateRandomPassword();
        const genratedPassword = await hashPassword(password);
        
        const uniqueNum = uuidv4();
        const dir = path.join(
          __dirname,
          `../../../public/uploads/faculty/${fields.email[0]}`
          );
          
          let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.photo[0].originalFilename.toString().replace(/\s/g, "-");
          
          copyFiles(files.photo[0].filepath, `${dir}/${fileName}`, dir);
          
          const url = `${fileName}`;
          
         const data = await sequelize.query(
          "INSERT INTO faculty(track_id,role,track_school_id,name,mothers_name,fathers_name,email,dob,phone,address,gender,experience,qualification,specialize,password,photo,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [ 
             
              uniqueNum,
              "faculty",
              fields.school_id[0],
              fields.name[0],
              fields.mother_name[0],
              fields.father_name[0],
              fields.email[0],
              fields.dob[0],
              fields.phone[0],
              fields.address[0],
              fields.gender[0],
              fields.experience[0],
              fields.qualification[0],
              fields.specialize[0],
              genratedPassword,
              url,
           "Faculty",
               currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
      
        return true;
      }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
    async createSchool(files, fields, req, res) {
      try {
        const classes = fields.number_class[0];
        const lower = parseInt(classes.split("-")[0]);
        const higher = parseInt(classes.split("-")[1]);
        const currentTime = getDate("YYYY-MM-DD hh:mm");
      

      const userExist = await sequelize.query(
        "SELECT * FROM school WHERE principal_email =? OR principal_phone=?",
        {
          replacements: [fields.principal_email[0], fields.principal_phone[0]],
          type: QueryTypes.SELECT,
        }
      );

      if (userExist.length > 0) {
        return false;
      } else {
       
       
        const password = await generateRandomPassword();
        const genratedPassword = await hashPassword(password);

        const uniqueNum = uuidv4();
        const dir = path.join(
          __dirname,
          `../../../public/uploads/school/${fields.principal_email[0]}`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.logo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.logo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

        const data = await sequelize.query(
          "INSERT INTO school(track_id,role,school_name,principal_name,principal_email,principal_phone,year_establish,address,number_of_class,password,logo,created_at,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              "school",
              fields.school_name[0],
              fields.principal_name[0],
              fields.principal_email[0],
              fields.principal_phone[0],
              fields.school_year[0],
              fields.school_address[0],
              fields.number_class[0],
              genratedPassword,
              url,
           
              currentTime,
              "SCHOOL"
            ],
            type: QueryTypes.INSERT,
          }
        );
        // console.log(data);
        // for (let i = lower; i <= higher; i++) {
        //   await sequelize.query(
        //     "INSERT INTO class(track_id,track_school_id,class_name,created_by,created_at) VALUES (?,?,?,?,?)",
        //     {
        //       replacements: [
             
        //      uniqueNum,
             
        //         data[0],
        //         `class${i}`,
        //        req.user[0].role,
        //         currentTime,
        //       ],
        //       type: QueryTypes.INSERT,
        //     }
        //   );
        // }
        return true;
      }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
    async fetchClassBySchool(req,res) {
     try {
       
       const schoolId = req.body.schoolId;
      
       const studentData = await sequelize.query(
         `SELECT * FROM class WHERE track_school_id = '${schoolId}'`,
         {
           type: QueryTypes.SELECT,
           
          }
          );
        
          return studentData;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 async getSchool( username) {
    try {
      const userData = await sequelize.query(
        "SELECT * FROM `school` WHERE principal_email = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [username],
        }
      );

      return userData;
    } catch (error) {
      console.error(error);
    }
  }
   async getPaymentStatus( req,res) {
    try {
     
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
    
        const payment = await sequelize.query(
        "SELECT * FROM `school` LEFT JOIN school_payment ON school_payment.track_school_id = school.track_id WHERE school_payment.transaction_status = ? AND membership = ? AND school_payment.track_school_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: ["success","LIVE",id],
        }
      );

      return payment;
    } catch (error) {
      console.error(error);
    }
  }
  async countStudentOfSchool( req,res) {
    try {
     
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
    
        const payment = await sequelize.query(
        "SELECT * FROM `student` WHERE track_school_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      return payment;
    } catch (error) {
      console.error(error);
    }
  }

  async getPaymentDetails( req,res) {
    try {
     
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
    
    const payment = await sequelize.query(
        "SELECT school.school_name,school_payment.transaction_date,school_payment.transaction_status,school.principal_phone,school_payment.track_id,school_payment.frequency,school_payment.transaction_amount,school.principal_email FROM `school` INNER JOIN school_payment ON school_payment.track_school_id = school.track_id WHERE school_payment.track_school_id = ? ORDER BY school_payment.id DESC LIMIT 1",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      return payment;
    } catch (error) {
      console.error(error);
    }
  }

  async savePaymentDetails( req,res,paymentDoc) {
    try {
    
 const currentTime = getDate("YYYY-MM-DD hh:mm");

const nextDateTime = calculateNextDateTime(currentTime, req.body.frequency);
console.log('Next date and time:', nextDateTime);

       const uniqueNum = uuidv4();
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
    
      await sequelize.query(
          "INSERT INTO school_payment(track_id,track_school_id,frequency,transaction_amount,transaction_date,transaction_status,membership,razorpay_payment_id,razorpay_order_id,razorpay_signature,valid_upto,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
              uniqueNum,
               id,
              req.body.frequency,
              req.body.amount,
              currentTime,
              paymentDoc.status === 'captured' ? 'success' : 'failed',
              'live',
              req.body.razorpay_payment_id,
              req.body.razorpay_order_id,
                 req.body.razorpay_signature,
             nextDateTime,
              req.user[0].role,
              currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
    
        const payment = await sequelize.query(
        "SELECT school.school_name,school_payment.transaction_date,school_payment.transaction_status,school.principal_phone,school_payment.track_id,school_payment.frequency,school_payment.transaction_amount,school.principal_email FROM `school` INNER JOIN school_payment ON school_payment.track_school_id = school.track_id WHERE school_payment.track_school_id = ? ORDER BY school_payment.id DESC LIMIT 1",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );

      return payment;
    } catch (error) {
      console.error(error);
    }
  }
  
 async getDashboardDataBySchool(req,res) {
    try {
     const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      // let whereClause = "";
      // let dateClause = "";
      // if (req.user[0].role == "student") {
      //   whereClause = `student_attendance.track_student_id = '${req.user[0].track_id}' AND `
      // }
      //    if (req.body.startDates != undefined && req.body.endDates != undefined) {
      //   dateClause = `AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' `
      // }
      //  const data = await sequelize.query(
      //   `SELECT student_attendance.created_at,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out,student.name,student.email,student.track_class_id,student.track_school_id FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE ` +whereClause+ `student.track_school_id = '${id}' `+ dateClause +`AND (student.name like "%${
      //     req.body.search.value
      //   }%" OR student.email like "%${req.body.search.value}%") LIMIT ${parseInt(
      //     req.body.length
      //   )} OFFSET ${parseInt(req.body.start)}`,
      //   {
      //     type: QueryTypes.SELECT,
      //   }
      // );
      

      // for (let i = 0; i < data.length; i++) {
       
      //   data[i]["created_at"] = `${data[i].created_at}`;
      
      //   data[i]["attendance_status"] = `${data[i].attendance_status}`;
      //   data[i]["check_in"] = `${data[i].check_in}`;
      //   data[i]["check_out"] = `${data[i].check_out}`;

      // }
 const numberOfstudent = await sequelize.query(
        "SELECT * FROM `student` WHERE track_school_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );
       const numberOfteacher = await sequelize.query(
        "SELECT * FROM `faculty` WHERE track_school_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );
      const CountTopStudent = await sequelize.query(
        "SELECT student.*, MAX(exam_status.obtained_marks) AS max_obtained_marks FROM student LEFT JOIN exam_status ON exam_status.track_student_id = student.track_id WHERE exam_status.exam_status = 'completed' GROUP BY exam_status.track_student_id ORDER BY max_obtained_marks DESC LIMIT 5",
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );
      console.log("?>>>>>>>>>>>>>>>>>>>>>>>>",CountTopStudent);
  const CountPercentStudent = await sequelize.query(
    "SELECT \
        (SELECT COUNT(*) FROM `student_attendance` \
            INNER JOIN student ON student.track_id = student_attendance.track_student_id \
            WHERE student_attendance.attendance_status = 'P' AND student.track_school_id = ? AND DATE(student_attendance.created_at) = CURRENT_DATE()) AS present_student_count, \
        (SELECT COUNT(*) FROM `student` \
            WHERE student.track_school_id = ?) AS total_student_count;",
    {
        type: QueryTypes.SELECT,
        replacements: [id, id],
    }
      );
      
      let studentAttendancePercentage;
      if (CountPercentStudent.length > 0) {
         // Calculate attendance percentage for students
        const presentStudentCount = CountPercentStudent[0].present_student_count;
        const totalStudentCount = CountPercentStudent[0].total_student_count;
         studentAttendancePercentage = (presentStudentCount / totalStudentCount) * 100;
        
              console.log("Student Attendance Percentage:", studentAttendancePercentage.toFixed(2) + "%");
      } else {
        studentAttendancePercentage = 0 + "%";
      }

      
        const CountPercentFaculty = await sequelize.query(
    "SELECT \
        (SELECT COUNT(*) FROM `faculty_attendance` \
            INNER JOIN faculty ON faculty.track_id = faculty_attendance.track_faculty_id \
            WHERE faculty_attendance.attendance_status = 'P' AND faculty.track_school_id = ? AND DATE(faculty_attendance.created_at) = CURRENT_DATE()) AS present_faculty_count, \
        (SELECT COUNT(*) FROM `faculty` \
            WHERE faculty.track_school_id = ?) AS total_faculty_count;",
    {
        type: QueryTypes.SELECT,
        replacements: [id, id],
    }
      );
      let facultyAttendancePercentage;
      if (CountPercentFaculty.length > 0) {
  
        // Calculate attendance percentage for students
        const presentFacultyCount = CountPercentFaculty[0].present_faculty_count;
        const totalFacultycount = CountPercentFaculty[0].total_faculty_count;
        facultyAttendancePercentage = (presentFacultyCount / totalFacultycount) * 100;
        
        console.log("Student Attendance Percentage:", facultyAttendancePercentage.toFixed(2) + "%");
      } else {
        facultyAttendancePercentage = 0 + "%";
}

     let numOfStd = numberOfstudent.length>0 ? numberOfstudent.length:0;
     let numOFFac = numberOfteacher.length>0 ? numberOfteacher.length:0;
      return {numOfStd,numOFFac,facultyAttendancePercentage,studentAttendancePercentage,CountTopStudent};
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }

   async countDashboardDataBySchool(req,res) {
    try {
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      let dateClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` AND student_attendance.track_student_id = '${req.user[0].track_id}'`
      }
       if (req.body.startDates != undefined && req.body.endDates != undefined) {
        dateClause = `AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' `
      }
       const data = await sequelize.query(
        `SELECT * FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE student.track_school_id = '${id}' `+ dateClause + whereClause,
        {
          type: QueryTypes.SELECT,
        }
      );
      
      return data;
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
  async getStudent( username) {
    try {
      const userData = await sequelize.query(
        "SELECT * FROM `student` WHERE email = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [username],
        }
      );

      return userData;
    } catch (error) {
      console.error(error);
      dashLogger.error(`Error : ${error}`);
    }
  }

  async getAllSchool( req,res) {
    try {
      const schoolData = await sequelize.query(
        "SELECT * FROM `school`",
        {
          type: QueryTypes.SELECT,
          replacements: [],
        }
      );

      return schoolData;
    } catch (error) {
      console.error(error);
      dashLogger.error(`Error : ${error}`);
    }
  }
  
  async getTeacher( username) {
    try {
      const userData = await sequelize.query(
        "SELECT * FROM `faculty` WHERE email = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [username],
        }
      );

      return userData;
    } catch (error) {
      console.error(error);
      dashLogger.error(`Error : ${error}`);
    }
  }
  
   async getSchoolId( ID) {
    try {
      const userData = await sequelize.query(
        "SELECT * FROM `school` WHERE track_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [ID],
        }
      );

      return userData;
    } catch (error) {
      console.error(error);
      dashLogger.error(`Error : ${error}`);
    }
  }
   async getStudentId( ID) {
    try {
      const userData = await sequelize.query(
        "SELECT * FROM `student` WHERE track_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [ID],
        }
      );

      return userData;
    } catch (error) {
      console.error(error);
      dashLogger.error(`Error : ${error}`);
    }
  }
   async getFacultyId( ID) {
    try {
      const userData = await sequelize.query(
        "SELECT * FROM `faculty` WHERE track_id = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [ID],
        }
      );

      return userData;
    } catch (error) {
      console.error(error);
      dashLogger.error(`Error : ${error}`);
    }
}
  
 


 
}

module.exports = {
  AuthManagement,
};
