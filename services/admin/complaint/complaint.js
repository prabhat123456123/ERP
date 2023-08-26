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

 async getComplaint(body) {
    try {
//  console.log(sequelize)
     
         const data = await sequelize.query(
        `SELECT student.id,student.class_id,student.school_id,complaint.description,student.name,complaint.id as cId FROM complaint RIGHT JOIN student ON student.id =complaint.student_id  WHERE student.name like "%${
          body.search.value
        }%" OR student.email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].name}`;
        data[i]["description"] = `${data[i].description}`;
      

        data[i][
          "action"
        ] = `<button class='btn btn-add btn-sm editBtn' onclick='addComplaint(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' >Add </button> <button class='btn btn-add btn-sm editBtn' onclick='editComplaint(${data[i].id},${data[i].school_id},${data[i].class_id},${data[i].cId})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteComplaint(${data[i].id},${data[i].school_id},${data[i].class_id},${data[i].cId})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewComplaint(${data[i].id},${data[i].school_id},${data[i].class_id},${data[i].cId})' data-id='${data[i].id}' > View </button> `;
       
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
    async countComplaint(body) {
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
 
   async updateComplaintById(files, fields, req, res) {
     try {
        console.log(fields)
        console.log(files.student_photo[0].size)
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
       
       
        const data = await sequelize.query(
          "UPDATE `complaint` SET description=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              fields.description[0],
            
              "STUDENT",
              currentTime,
               fields.complaint_id[0],
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
      console.log(req.body);
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
        const uniqueNum = uuidv4();
         const data = await sequelize.query(
          "INSERT INTO complaint(track_id,student_id,class_id,school_id,description,faculty_id,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              req.body.student_id,
              req.body.class_id,
              req.body.school_id,
              req.body.description,
              req.body.faculty_id,
            
              "FACULTY",
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
   async viewComplaintById(body) {
    try {
      const complaintId = parseInt(body.complaintId);
      
     const data = await sequelize.query(
        `SELECT complaint.*,class.class_name,faculty.name as fname FROM complaint INNER JOIN student ON student.id = complaint.student_id INNER JOIN faculty ON faculty.id = complaint.faculty_id INNER JOIN class ON class.id = complaint.class_id WHERE complaint.id = ${complaintId}`,
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
