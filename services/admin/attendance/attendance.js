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
// const { v4: uuidv4 } = require("uuid");
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
       
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
       if (req.user[0].role == "school" || req.user[0].role == "faculty") {
         
         const data = await sequelize.query(
           `SELECT * FROM class WHERE school_id = ${id}`,
           {
             type: QueryTypes.SELECT,
             
            }
         );
         return data;

       }

       if (req.user[0].role == "student") {
       
         const data = await sequelize.query(
           `SELECT * FROM student_attendance WHERE student_id = ${req.user[0].id} AND DATE(created_at) = CURDATE();`,
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
       
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
       if (req.user[0].role == "school") {
         const data = await sequelize.query(
           `SELECT * FROM faculty WHERE school_id = ${id}`,
           {
             type: QueryTypes.SELECT,
           
           }
         );
        
         return data;
       }
if (req.user[0].role == "faculty") {
       
         const data = await sequelize.query(
           `SELECT * FROM faculty_attendance WHERE faculty_id = ${req.user[0].id} AND DATE(created_at) = CURDATE();`,
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
 async getStudent(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT student.id,student.school_id,student.class_id,student.name,student.email,student.gender,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out FROM student LEFT JOIN student_attendance ON student_attendance.student_id = student.id  WHERE student.name like "%${
          body.search.value
        }%" OR student.email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       
        data[i]["name"] = `${data[i].name}`;
      
        data[i]["attendance_status"] = `${data[i].attendance_status}`;
        data[i]["check_in"] = `${data[i].check_in}`;
        data[i]["check_out"] = `${data[i].check_out}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='viewStudentAttendance(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countStudent(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM student`,
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
   async getFacultyAttendanceReport(req) {
    try {
     const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
       const data = await sequelize.query(
        `SELECT faculty_attendance.created_at,faculty_attendance.attendance_status,faculty_attendance.check_in,faculty_attendance.check_out FROM faculty_attendance INNER JOIN faculty ON faculty.id = faculty_attendance.faculty_id WHERE faculty_attendance.faculty_id = ${req.body.facultyId} AND faculty.school_id = ${id} AND faculty_attendance.created_at BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`,
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
    async getReportByStudent(req) {
    try {
    
        const data = await sequelize.query(
        `SELECT student_attendance.created_at,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out FROM student_attendance INNER JOIN student ON student.id = student_attendance.student_id WHERE student_attendance.student_id = ${req.user[0].id} AND student.school_id = ${req.user[0].school_id} AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`,
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
    async getReportByFaculty(req) {
    try {
     const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
       const data = await sequelize.query(
        `SELECT faculty_attendance.created_at,faculty_attendance.attendance_status,faculty_attendance.check_in,faculty_attendance.check_out FROM faculty_attendance INNER JOIN faculty ON faculty.id = faculty_attendance.faculty_id WHERE faculty_attendance.faculty_id = ${req.user[0].id} AND faculty.school_id = ${req.user[0].school_id} AND faculty_attendance.created_at BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`,
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
   async checkoutFacultyAttendance(req) {
     try {
  
       const id = req.user[0].id;
          const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE id= ${req.user[0].school_id}`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE id = ${req.user[0].school_id} HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
       if (rangeData.length > 0) {
         console.log("ppppppppppppppppppppppppppppppppppppppppppppp",data);
         const data = await sequelize.query(
           `SELECT * FROM faculty_attendance WHERE faculty_id = ${id} AND check_in IS NOT NULL AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           }
         );
         if (data.length > 0) {
           await sequelize.query(
             `UPDATE faculty_attendance SET check_out = '${req.body.formattedTime}', check_out_flag = "1" WHERE faculty_id = ${id}`,
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
       const currentTime = getDate("YYYY-MM-DD hh:mm");
       const id = req.user[0].id;
         const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE id= ${req.user[0].school_id}`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE id = ${req.user[0].school_id} HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
       if (rangeData.length > 0) {
      
         const data = await sequelize.query(
           `SELECT * FROM faculty_attendance WHERE faculty_id= ${id} AND check_in is NULL AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           }
         );

         if (data.length > 0) {
           await sequelize.query(
             `UPDATE faculty_attendance SET check_in=${req.body.formattedTime},check_in_flag = "1" WHERE faculty_id = ${id} AND DATE(created_at) = CURDATE();`,
             {
               type: QueryTypes.UPDATE,
          
             }
           );
           return true;
         } else {
           const data = await sequelize.query(
             "INSERT INTO faculty_attendance(faculty_id,attendance_status,check_in,check_in_flag,latitude,longitude,created_by,created_at)VALUES(?,?,?,?,?,?,?,?)",
             {
               replacements: [
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
   async getStudentAttendanceReport(req) {
     try {
      console.log(req.body);
  const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
       const data = await sequelize.query(
        `SELECT student_attendance.created_at,student_attendance.attendance_status,student_attendance.check_in,student_attendance.check_out FROM student_attendance INNER JOIN student ON student.id = student_attendance.student_id WHERE student_attendance.student_id = ${req.body.studentId} AND student.class_id = ${req.body.classId} AND student.school_id = ${id} AND DATE(student_attendance.created_at) BETWEEN '${req.body.startDates}' AND '${req.body.endDates}'`,
        {
          type: QueryTypes.SELECT,
        }
      );
      console.log(data);
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
        `SELECT * FROM school WHERE id= ${req.user[0].school_id}`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE id = ${req.user[0].school_id} HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
       if (rangeData.length > 0) {
         const data = await sequelize.query(
           `SELECT * FROM student_attendance WHERE student_id= ${id} AND check_in IS NOT NULL AND DATE(created_at) = CURDATE();`,
           {
             type: QueryTypes.SELECT,
           }
         );

         if (data.length > 0) {
           await sequelize.query(
             `UPDATE student_attendance SET check_out = '${req.body.formattedTime}', check_out_flag = "1" WHERE student_id = ${id} AND DATE(created_at) = CURDATE();`,
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

      const id = req.user[0].id;
      const currentTime = getDate("YYYY-MM-DD hh:mm");
         const school_lat_long = await sequelize.query(
        `SELECT * FROM school WHERE id= ${req.user[0].school_id}`,
        {
          type: QueryTypes.SELECT,
        }
        );
        const rangeData = await sequelize.query(
          `SELECT id,school_name,latitude,longitude, (6371 * acos(cos(radians(${req.body.latitude})) * cos(radians(${school_lat_long[0].latitude})) * cos(radians(${school_lat_long[0].longitude}) - radians(${req.body.longitude})) + sin(radians(${req.body.latitude})) * sin(radians(${school_lat_long[0].latitude})))) AS distance FROM school WHERE id = ${req.user[0].school_id} HAVING distance <= 0.1`,
          {
            type: QueryTypes.SELECT,
          }
          );
     
      if (rangeData.length > 0) {
        const data = await sequelize.query(
          `SELECT * FROM student_attendance WHERE student_id= ${id} AND check_in is NULL AND DATE(created_at) = CURDATE();`,
          {
            type: QueryTypes.SELECT,
          }
        );

        if (data.length > 0) {
          await sequelize.query(
            `UPDATE student_attendance SET check_in=${req.body.formattedTime}, check_in_flag = "1" WHERE student_id = ${id} AND DATE(created_at) = CURDATE();`,
            {
              type: QueryTypes.UPDATE,
          
            }
          );
          return true;
        } else {
    
          await sequelize.query(
            "INSERT INTO student_attendance(student_id,attendance_status,check_in,check_in_flag,latitude,longitude,created_by,created_at)VALUES(?,?,?,?,?,?,?,?)",
            {
              replacements: [
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
async getFaculty(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT faculty.id,faculty.school_id,faculty.name,faculty.email,faculty.gender,faculty_attendance.attendance_status,faculty_attendance.check_in,faculty_attendance.check_out FROM faculty LEFT JOIN faculty_attendance ON faculty_attendance.faculty_id = faculty.id WHERE name like "%${
          body.search.value
        }%" OR email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["name"] = `${data[i].name}`;
      
data[i]["attendance_status"] = `${data[i].attendance_status}`;
        data[i]["check_in"] = `${data[i].check_in}`;
        data[i]["check_out"] = `${data[i].check_out}`;
        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='viewFacultyAttendance(${data[i].id},${data[i].school_id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countFaculty(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM faculty`,
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
      let id = parseInt(body.pk)

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE student SET name=? WHERE id = ${id}`,
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
        `UPDATE student SET email=? WHERE id = ${id}`,
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
        `UPDATE student SET gender=? WHERE id = ${id}`,
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

      const id = parseInt(body.id);
     const data = await sequelize.query(
        `DELETE FROM student WHERE id = ${id}`,
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
        `DELETE FROM student WHERE id = (${ids[index]})`,
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
