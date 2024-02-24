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

class ComplaintManagement {
  constructor() {}

 async getComplaint(req,res) {
    try {
      const id = req.user[0].role == "school" ? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `complaint.student_id = ${req.user[0].id} AND `
      }
     
         const data = await sequelize.query(
        `SELECT student.id,student.class_id,student.school_id,complaint.description,student.name,complaint.id as cId FROM complaint RIGHT JOIN student ON student.id =complaint.student_id  WHERE student.school_id = ${id} AND ` + whereClause + ` (student.name like "%${
          req.body.search.value
        }%" OR student.email like "%${req.body.search.value}%") LIMIT ${parseInt(
         req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].cId}' class='delete_check'>`;
        data[i]["name"] = `${data[i].name}`;
        data[i]["description"] = `${data[i].description}`;
      

        data[i][
          "action"
        ] = `<button class='btn btn-add btn-sm editBtn' onclick='addComplaint(${data[i].id})' data-id='${data[i].cId}' >Add </button> <button class='btn btn-add btn-sm editBtn' onclick='editComplaint(${data[i].cId})' data-id='${data[i].cId}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteComplaint(${data[i].cId})' data-id='${data[i].cId}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewComplaint(${data[i].cId})' data-id='${data[i].cId}' > View </button> `;
       
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
    async countComplaint(req,res) {
    try {
 const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
     let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `complaint.student_id = ${req.user[0].id} AND `
      }
     
       const data = await sequelize.query(
        `SELECT student.id,student.class_id,student.school_id,complaint.description,student.name,complaint.id as cId FROM complaint RIGHT JOIN student ON student.id =complaint.student_id  WHERE student.school_id = ${id} AND ` + whereClause ,
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
    async createComplaint(files, fields, req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");

      // const userExist = await sequelize.query(
      //   "SELECT * FROM student WHERE email =? OR phone=?",
      //   {
      //     replacements: [fields.student_email[0], fields.student_phone[0]],
      //     type: QueryTypes.SELECT,
      //   }
      // );

      // if (userExist.length > 0) {
      //   return false;
      // } else {
       
       
       

        const uniqueNum = uuidv4();
       

        const data = await sequelize.query(
          "INSERT INTO complaint(track_id,student_id,class_id,school_id,description,faculty_id,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              fields.student_name[0],
              fields.student_id[0],
              fields.class_id[0],
              fields.school_id[0],
              fields.description[0],
              fields.faculty_id[0],
            
              "STUDENT",
               currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
      
        return true;
      // }
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 
   async updateComplaintById(req, res) {
     try {
       
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
       
       
        const data = await sequelize.query(
          "UPDATE `complaint` SET description=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              req.body.complaint,
            
              "STUDENT",
              currentTime,
               req.body.complaint_id,
            ],
            type: QueryTypes.UPDATE,
          }
        );
      
        return true;
      
       

     
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
     async addComplaintById(req, res) {
     try {
      // console.log(req.user[0]);
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
        const uniqueNum = uuidv4();
         const data = await sequelize.query(
          "INSERT INTO complaint(track_id,student_id,description,faculty_school_id,created_by,created_at) VALUES (?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              req.body.student_id,
           
              req.body.description,
              req.body.faculty_school_id,
            
              req.user[0].role=="school"? "SCHOOL" : "FACULTY",
               currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
      
        return true;
      
       

     
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
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
   

    async deleteComplaint(body) {
    try {

      const complaintId = parseInt(body.complaintId);
    
     const data = await sequelize.query(
        `DELETE FROM complaint WHERE id = ${complaintId}`,
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
  async fetchComplaintById(body) {
    try {
      const complaintId = parseInt(body.complaintId);
    
     const data = await sequelize.query(
        `SELECT * FROM complaint WHERE id = ${complaintId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );
       const classes = await sequelize.query(
        `SELECT * FROM class`,
        {
          type: QueryTypes.SELECT,
         
        }
        );
          return {data,classes};

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async viewComplaintById(req) {
    try {
      const complaintId = parseInt(req.body.complaintId);
      let joinClause = "";
      let selectClause = "";
      if (req.user[0].role == "school") {
        selectClause = `school.school_name,school.role,`
        joinClause = `INNER JOIN school ON school.id = complaint.faculty_school_id`
      }
      if (req.user[0].role == "faculty") {
           selectClause = `faculty.name as fname,faculty.role,`
        joinClause = `INNER JOIN faculty ON faculty.id = complaint.faculty_school_id`
      }
      const data = await sequelize.query(
        `SELECT complaint.description,class.class_name,` + selectClause + `student.name as sname FROM complaint INNER JOIN student ON student.id = complaint.student_id ` + joinClause + ` INNER JOIN class ON class.id = student.class_id WHERE complaint.id = ${complaintId}`,
        {
          type: QueryTypes.SELECT,
          
        }
        );
        
        console.log(">?????????????????????????????????????/",data);
          return data;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 
   
    async deleteMultipleComplaint(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM complaint WHERE id = (${ids[index]})`,
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
  ComplaintManagement,
};
