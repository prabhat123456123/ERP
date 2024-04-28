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
        `SELECT * FROM student_financial where track_student_id = ?`,
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
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` student.track_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT student.track_id,student.track_class_id,student.track_school_id,student.name,class.annual_fee,class.class_name FROM student INNER JOIN class ON class.track_id = student.track_class_id LEFT JOIN student_payment ON student_payment.track_student_id = student.track_id WHERE student.track_school_id = '${id}' AND ` + whereClause + `(name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       
        data[i]["name"] = `${data[i].name}`;
        data[i]["class"] = `${data[i].class_name}`;
        data[i]["fee"] = `${data[i].annual_fee}`;
       
        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm addBtn' onclick='addPayment(${data[i].track_id})' data-id='${data[i].track_id}' data-annualfee='${data[i].annual_fee}' > Pay </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewStudentPayment(${data[i].track_id})' data-id='${data[i].track_id}' > View Payment Detail </button> `;
       
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
    async countStudentFinancial(req,res) {
    try {
//  console.log(sequelize)
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = ` AND student.track_id = '${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT student.track_id,student.track_class_id,student.track_school_id,student.name,class.annual_fee,class.class_name FROM student INNER JOIN class ON class.track_id = student.track_class_id LEFT JOIN student_payment ON student_payment.track_student_id = student.track_id WHERE student.track_school_id = '${id}' ` + whereClause,
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
     const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty.track_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT faculty.track_id,faculty.track_school_id,faculty.name,faculty.salery FROM faculty LEFT JOIN faculty_payment ON faculty_payment.track_faculty_id = faculty.track_id WHERE faculty.track_school_id = '${id}' AND ` + whereClause + `(name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
      
        data[i]["name"] = `${data[i].name}`;
        data[i]["salery"] = `${data[i].salery}`;
       
        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm addBtn' onclick='addPayment(${data[i].track_id},${data[i].salery})'  data-salary='${data[i].salery}' data-id='${data[i].track_id}' > Pay </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewFacultyPayment(${data[i].track_id})' data-id='${data[i].track_id}' > View PAyment Details </button> `;
       
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
    async countFacultyFinancial(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `AND faculty.track_id = '${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT faculty.track_id,faculty.track_school_id,faculty.name,faculty.salery FROM faculty LEFT JOIN faculty_payment ON faculty_payment.track_faculty_id = faculty.track_id WHERE faculty.track_school_id = '${id}' ` + whereClause,
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
