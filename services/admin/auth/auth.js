const sequelize = require("../../../config/database");
const { QueryTypes, Sequelize } = require("sequelize");
// const {
//   ErrorHandler,
//   statusCodes,
//   casbinEnforcer,
//   actionLogger,
// } = require("../../../helper");
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
              "INSTITUTE",
            ],
            type: QueryTypes.INSERT,
          }
        );
        console.log(data);
        for (let i = lower; i <= higher; i++) {
          await sequelize.query(
            "INSERT INTO class(track_id,track_school_id,class_name,created_by,created_at) VALUES (?,?,?,?,?)",
            {
              replacements: [
             
             uniqueNum,
             
                data[0],
                `class${i}`,
           
                "INSTITUTE",
                currentTime,
              ],
              type: QueryTypes.INSERT,
            }
          );
        }
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

  async getPaymentDetails( req,res) {
    try {
     
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
    
        const payment = await sequelize.query(
        "SELECT * FROM `school` INNER JOIN school_payment ON school_payment.track_school_id = school.track_id WHERE school_payment.track_school_id = ? ORDER BY id DESC LIMIT 1",
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

  async savePaymentDetails( req,res) {
    try {
     const currentTime = getDate("YYYY-MM-DD hh:mm");
       const uniqueNum = uuidv4();
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
    
      await sequelize.query(
          "INSERT INTO school_payment(track_id,track_school_id,frequency,transaction_amount,transaction_date,transaction_status,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)",
          {
            replacements: [
              uniqueNum,
               id,
              req.body.frequency,
              req.body.transaction_amount,
              currentTime,
              req.body.status,
              "INSTITUTE",
              currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
    
        const payment = await sequelize.query(
        "SELECT * FROM `school` INNER JOIN school_payment ON school_payment.track_school_id = school.track_id WHERE school_payment.track_school_id = ? ORDER BY id DESC LIMIT 1",
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
      let whereClause = "";
      let dateClause = "";
      if (req.user[0].role == "student") {
        whereClause = `student_attendance.track_student_id = '${req.user[0].track_id}' AND `
      }
         if (req.body.startDates != undefined && req.body.endDates != undefined) {
        dateClause = `AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' `
      }
       const data = await sequelize.query(
        `SELECT student_attendance.created_at,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out,student.name,student.email,student.track_class_id,student.track_school_id FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE ` +whereClause+ `student.track_school_id = '${id}' `+ dateClause +`AND (student.name like "%${
          req.body.search.value
        }%" OR student.email like "%${req.body.search.value}%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       
        data[i]["created_at"] = `${data[i].created_at}`;
      
        data[i]["attendance_status"] = `${data[i].attendance_status}`;
        data[i]["check_in"] = `${data[i].check_in}`;
        data[i]["check_out"] = `${data[i].check_out}`;

      
       
      }

     
      return data;
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
