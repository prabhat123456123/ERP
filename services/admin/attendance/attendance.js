const sequelize = require("../../../config/database");
const { QueryTypes, Sequelize } = require("sequelize");
// const {
//   ErrorHandler,
//   statusCodes,
//   casbinEnforcer,
//   actionLogger,
// } = require("../../../helper");
// const {
//   copyFiles,
//   getDate,
//   generateRandomNumber,
//   addDate,
// } = require("../../../utils");
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
