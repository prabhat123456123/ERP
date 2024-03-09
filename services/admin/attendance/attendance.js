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
  generateRandomNumber,
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

class AttendanceManagement {
  constructor() {}
async getClass(req) {
     try {
       
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
       if (req.user[0].role == "school" || req.user[0].role == "faculty") {
         
         const data = await sequelize.query(
           `SELECT * FROM class WHERE track_school_id = '${id}'`,
           {
             type: QueryTypes.SELECT,
             
            }
         );
         return data;

       }

       if (req.user[0].role == "student") {
       
         const data = await sequelize.query(
           `SELECT * FROM student_attendance WHERE track_student_id = '${req.user[0].track_id}' AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           
           }
         );
        
         return data;
       }
    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }

  async getFacultyBySchool(req) {
     try {
       
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
       if (req.user[0].role == "school") {
         const data = await sequelize.query(
           `SELECT * FROM faculty WHERE track_school_id = '${id}'`,
           {
             type: QueryTypes.SELECT,
           
           }
         );
        
         return data;
       }
if (req.user[0].role == "faculty") {
       
         const data = await sequelize.query(
           `SELECT * FROM faculty_attendance WHERE track_faculty_id = '${req.user[0].track_id}' AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           
           }
         );
        
         return data;
       }
    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 async getStudent(req,res) {
    try {
//  console.log(sequelize)
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `student.track_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT student.track_id,student.track_school_id,student.track_class_id,student.name,student.email,student.gender,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out,student_attendance.created_at FROM student LEFT JOIN student_attendance ON student_attendance.track_student_id = student.track_id WHERE student.track_school_id = '${id}' AND ` + whereClause + `(student.name like "%${
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
    async countStudent(req,res) {
    try {
//  console.log(sequelize)
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` AND student.track_id = '${req.user[0].track_id}'`
      }
     
       const data = await sequelize.query(
        `SELECT * FROM student INNER JOIN student_attendance ON student_attendance.track_student_id = student.track_id WHERE student.track_school_id = '${id}'`+ whereClause,
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
    async countStudentReportBySchool(req,res) {
    try {
//  console.log(sequelize)
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` AND student_attendance.track_student_id = '${req.user[0].track_id}'`
      }
     
       const data = await sequelize.query(
        `SELECT * FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE student.track_school_id = '${id}' AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`+ whereClause,
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
   async countStudentReportByStudent(req,res) {
    try {
//  console.log(sequelize)
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` AND student_attendance.track_student_id = '${req.user[0].track_id}'`
      }
     
       const data = await sequelize.query(
        `SELECT * FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE student.track_school_id = '${id}' AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`+ whereClause,
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
   async countFacultyReportByAll(req,res) {
    try {
//  console.log(sequelize)
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = ` AND faculty_attendance.track_faculty_id = '${req.user[0].track_id}'`
      }
     
       const data = await sequelize.query(
        `SELECT * FROM faculty_attendance INNER JOIN faculty ON faculty.track_id = faculty_attendance.track_faculty_id WHERE faculty.track_school_id = '${id}' AND DATE(faculty_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`+ whereClause,
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
   async countFacultyReportByFaculty(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role == "school" ? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      
      if (req.user[0].role == "faculty") {
        whereClause = ` AND faculty_attendance.track_faculty_id = '${req.user[0].track_id}'`
      }
     
       const data = await sequelize.query(
        `SELECT * FROM faculty_attendance INNER JOIN faculty ON faculty.track_id = faculty_attendance.track_faculty_id WHERE faculty.track_school_id = '${id}' AND DATE(faculty_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`+ whereClause,
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
   async getFacultyAttendanceReport(req,res) {
     try {
      
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      // let whereClause = "";
      // if (req.user[0].role == "student") {
      //   whereClause = `student.id = ${req.user[0].id} AND `
      // }
       const data = await sequelize.query(
        `SELECT faculty_attendance.created_at,faculty_attendance.attendance_status,faculty_attendance.check_in,faculty_attendance.check_out FROM faculty_attendance INNER JOIN faculty ON faculty.track_id = faculty_attendance.track_faculty_id WHERE faculty_attendance.track_faculty_id = '${req.body.facultyId}' AND faculty.track_school_id = '${id}' AND DATE(faculty_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' AND (faculty.name like "%${
          req.body.search.value
        }%" OR faculty.email like "%${req.body.search.value}%") LIMIT ${parseInt(
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
    async getReportByStudent(req) {
    try {
     const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `student_attendance.track_student_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT student_attendance.created_at,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out,student.name,student.email,student.track_class_id,student.track_school_id FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE ` +whereClause+ ` student.track_school_id = '${id}' AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' AND (student.name like "%${
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
    async getReportByFaculty(req,res) {
    try {
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty_attendance.track_faculty_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT faculty_attendance.created_at,faculty_attendance.attendance_status,faculty_attendance.check_in,faculty_attendance.check_out FROM faculty_attendance INNER JOIN faculty ON faculty.track_id = faculty_attendance.track_faculty_id WHERE ` +whereClause+ ` faculty.track_school_id = '${id}' AND DATE(faculty_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' AND (faculty.name like "%${
          req.body.search.value
        }%" OR faculty.email like "%${req.body.search.value}%") LIMIT ${parseInt(
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
   async checkoutFacultyAttendance(req) {
     try {
  
       const id = req.user[0].track_id;
          const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE track_id= '${req.user[0].track_school_id}'`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE id = '${req.user[0].school_id}' HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
       if (rangeData.length > 0) {
         const data = await sequelize.query(
           `SELECT * FROM faculty_attendance WHERE track_faculty_id = '${id}' AND check_in IS NOT NULL AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           }
         );
         if (data.length > 0) {
           await sequelize.query(
             `UPDATE faculty_attendance SET check_out = '${req.body.formattedTime}', check_out_flag = "1" WHERE faculty_id = '${id}'`,
             {
               type: QueryTypes.UPDATE,
          
             }
           );
           return {data:"yes"};
         } else {
           return {data:"no"};
         }
       }else {
        return {data:"not"};
      }
     
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async checkinFacultyAttendance(req) {
     try {
         const uniqueNum = uuidv4();
       const currentTime = getDate("YYYY-MM-DD hh:mm");
       const id = req.user[0].track_id;
         const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE id= '${req.user[0].track_school_id}'`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE track_id = '${req.user[0].track_school_id}' HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
       if (rangeData.length > 0) {
      
         const data = await sequelize.query(
           `SELECT * FROM faculty_attendance WHERE track_faculty_id= '${id}' AND check_in is NULL AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           }
         );

         if (data.length > 0) {
           await sequelize.query(
             `UPDATE faculty_attendance SET check_in='${req.body.formattedTime}',check_in_flag = "1" WHERE track_faculty_id = '${id}' AND DATE(created_at) = CURDATE();`,
             {
               type: QueryTypes.UPDATE,
          
             }
           );
           return true;
         } else {
           const data = await sequelize.query(
             "INSERT INTO faculty_attendance(track_id,track_faculty_id,attendance_status,check_in,check_in_flag,latitude,longitude,created_by,created_at)VALUES(?,?,?,?,?,?,?,?,?)",
             {
               replacements: [
                 uniqueNum,
                 id,
                 "P",
                 req.body.formattedTime,
                 "1",
                 req.body.latitude,
                 req.body.longitude,
                 "STUDENT",
                 currentTime,
               ],
               type: QueryTypes.INSERT,
             }
           );
      
           return true;
         }
       } else {
         return false;
       }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async getStudentAttendanceReport(req,res) {
     try {
       
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      // let whereClause = "";
      // if (req.user[0].role == "student") {
      //   whereClause = `student.id = ${req.user[0].id} AND `
      // }
       const data = await sequelize.query(
        `SELECT student_attendance.created_at,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out,student.name,student.email,student.track_class_id,student.track_school_id FROM student_attendance INNER JOIN student ON student.track_id = student_attendance.track_student_id WHERE student_attendance.track_student_id = '${req.body.studentId}' AND student.track_class_id = '${req.body.classId}' AND student.track_school_id = '${id}' AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}' AND (student.name like "%${
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
   async checkoutStudentAttendance(req) {
     try {
      
       const id = req.user[0].id;
            const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE track_id= '${req.user[0].track_school_id}'`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE track_id = '${req.user[0].track_school_id}' HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
       if (rangeData.length > 0) {
         const data = await sequelize.query(
           `SELECT * FROM student_attendance WHERE track_student_id= '${id}' AND check_in IS NOT NULL AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           }
         );

         if (data.length > 0) {
           await sequelize.query(
             `UPDATE student_attendance SET check_out = '${req.body.formattedTime}', check_out_flag = "1" WHERE track_student_id = '${id}' AND DATE(created_at) = CURDATE();`,
             {
               type: QueryTypes.UPDATE,
          
             }
           );
           return {data:"yes"};
         } else {
           return {data:"no"};
         }
       } else {
        return {data:"not"};
      }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async checkinStudentAttendance(req) {
    try {
 const uniqueNum = uuidv4();
      const id = req.user[0].track_id;
      const currentTime = getDate("YYYY-MM-DD hh:mm");
         const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE track_id= '${req.user[0].track_school_id}'`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE track_id = '${req.user[0].track_school_id}' HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
      if (rangeData.length > 0) {
        const data = await sequelize.query(
          `SELECT * FROM student_attendance WHERE track_student_id = '${id}' AND check_in is NULL AND DATE(created_at) = CURDATE();`,
          {
            type: QueryTypes.SELECT,
          }
        );

        if (data.length > 0) {
          await sequelize.query(
            `UPDATE student_attendance SET check_in='${req.body.formattedTime}', check_in_flag = "1" WHERE track_student_id = '${id}' AND DATE(created_at) = CURDATE();`,
            {
              type: QueryTypes.UPDATE,
          
            }
          );
          return true;
        } else {
    
          await sequelize.query(
            "INSERT INTO student_attendance(track_id,track_student_id,attendance_status,check_in,check_in_flag,latitude,longitude,created_by,created_at)VALUES(?,?,?,?,?,?,?,?,?)",
            {
              replacements: [
                uniqueNum,
                id,
                "P",
                req.body.formattedTime,
                "1",
                req.body.latitude,
                req.body.longitude,
                "STUDENT",
                currentTime,
              ],
              type: QueryTypes.INSERT,
            }
          );
      
          return true;
        }
     
      } else {
        return false;
      }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
async getFaculty(req,res) {
    try {
//  console.log(sequelize)
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty.track_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT faculty.track_id,faculty.track_school_id,faculty.name,faculty.email,faculty.gender,faculty_attendance.attendance_status,faculty_attendance.check_in,faculty_attendance.check_out,faculty_attendance.created_at FROM faculty LEFT JOIN faculty_attendance ON faculty_attendance.track_faculty_id = faculty.track_id WHERE faculty.track_school_id = '${id}' AND ` + whereClause + `(name like "%${
          req.body.search.value
        }%" OR email like "%${req.body.search.value}%") LIMIT ${parseInt(
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
    async countFaculty(req,res) {
    try {
//  console.log(sequelize)
     const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = ` AND faculty.track_id = '${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT * FROM faculty INNER JOIN faculty_attendance ON faculty_attendance.track_faculty_id = faculty.track_id WHERE faculty.track_school_id = '${id}'`+ whereClause,
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
   async updateAdmission(body) {
    try {
 console.log(body)
      let id = body.pk;

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE student SET name=? WHERE track_id = '${id}'`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
        );
          return data;
      }
       if (body.name == "email") {
         const data = await sequelize.query(
        `UPDATE student SET email=? WHERE track_id = '${id}'`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
       if (body.name == "gender") {
         const data = await sequelize.query(
        `UPDATE student SET gender=? WHERE track_id = '${id}'`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
      
      

     


    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }

    async deleteAdmission(body) {
    try {

      const id = body.id;
     const data = await sequelize.query(
        `DELETE FROM student WHERE track_id = '${id}'`,
        {
          type: QueryTypes.DELETE,
         
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
    async deleteMultiple(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM student WHERE track_id = ('${ids[index]}')`,
        {
          type: QueryTypes.DELETE,
         
        }
        );
        }
          return true;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
  
 
}

module.exports = {
  AttendanceManagement,
};
