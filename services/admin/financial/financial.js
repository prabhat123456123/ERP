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

class FinancialManagement {
  constructor() {}
  async getClass(req,res) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM class`,
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
    async getFeeDetails(req,res) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM student_financial where student_id = ?`,
         {
           replacements: [req.params.studentId],
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
   async getStudentFinancial(req,res) {
    try {
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` student.id = ${req.user[0].id}`
      }
       const data = await sequelize.query(
        `SELECT id,class_id,school_id,name,email,fathers_name FROM student INNER JOIN student_financial ON student_financial.student_id = student.id WHERE student.school_id = ${id} AND ` + whereClause + `(name like "%${
          req.body.search.value
        }%" OR email like "%${req.body.search.value}%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].name}`;
        data[i]["fathername"] = `${data[i].fathers_name}`;
        data[i]["email"] = `${data[i].email}`;

        data[i][
          "action"
        ] = `<a href="/financial/view-student-fee-details/${data[i].id}" class='btn btn-success btn-sm'  data-id='${data[i].id}'> View Fee Details </a> `;
       
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
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` student.id = ${req.user[0].id}`
      }
       const data = await sequelize.query(
        `SELECT id,class_id,school_id,name,email,fathers_name FROM student INNER JOIN student_financial ON student_financial.student_id = student.id WHERE student.school_id = ${id} AND ` + whereClause,
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
     async getFacultyFinancial(req,res) {
    try {
//  console.log(sequelize)
     const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty.id = ${req.user[0].id} AND `
      }
       const data = await sequelize.query(
        `SELECT id,class_id,school_id,name,email,gender FROM faculty INNER JOIN faculty_financial ON faculty_financial.faculty_id = faculty.id WHERE faculty.school_id = ${id} AND ` + whereClause + `(name like "%${
          req.body.search.value
        }%" OR email like "%${req.body.search.value}%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].name}`;
        data[i]["email"] = `${data[i].email}`;
        data[i]["gender"] = `${data[i].gender}`;

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editAdmission(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm deleteBtn' onclick='deleteAdmission(${data[i].id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewAdmission(${data[i].id})' data-id='${data[i].id}' > View </button> `;
       
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
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty.id = ${req.user[0].id}`
      }
       const data = await sequelize.query(
        `SELECT id,class_id,school_id,name,email,gender FROM faculty INNER JOIN faculty_financial ON faculty_financial.faculty_id = faculty.id WHERE faculty.school_id = ${id} AND ` + whereClause,
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
 
}

module.exports = {
  FinancialManagement,
};
