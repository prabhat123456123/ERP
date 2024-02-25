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

class FeedbackManagement {
  constructor() {}

 async getFeedback(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty.id = ${req.user[0].id} AND `
      }
       const data = await sequelize.query(
        `SELECT faculty.id,faculty.school_id,feedback.title,feedback.rate,faculty.name,feedback.id as fId FROM feedback RIGHT JOIN faculty ON faculty.id =feedback.faculty_id  WHERE faculty.school_id = ${id} AND ` + whereClause + `(faculty.name like "%${
          req.body.search.value
        }%" OR faculty.email like "%${req.body.search.value}%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].fId}' class='delete_check'>`;
      
        data[i]["name"] = `${data[i].name}`;
        data[i]["title"] = `${data[i].title}`;
        data[i]["rate"] = `${data[i].rate}`;

        data[i][
          "action"
        ] = `<button class='btn btn-add btn-sm addBtn' onclick='addFeedback(${data[i].id},${data[i].school_id})' data-id='${data[i].fId}' >Add </button> <button class='btn btn-add btn-sm editBtn' onclick='editFeedback(${data[i].fId})' data-id='${data[i].fId}' > Edit </button> <button class='btn btn-danger btn-sm deleteBtn' onclick='deleteFeedback(${data[i].fId})' data-id='${data[i].fId}' > Delete </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewFeedback(${data[i].fId})' data-id='${data[i].fId}' > View </button> `;
       
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
    async countFeedback(req,res) {
    try {
//  console.log(sequelize)
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `AND faculty.id = ${req.user[0].id}`
      }
       const data = await sequelize.query(
        `SELECT faculty.id,faculty.school_id,feedback.title,feedback.rate,faculty.name,feedback.id as fId FROM feedback RIGHT JOIN faculty ON faculty.id =feedback.faculty_id  WHERE faculty.school_id = ${id} ` + whereClause,
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

     async createFeedback(files, fields, req, res) {
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
          "INSERT INTO feedback(track_id,student_id,faculty_id,school_id,title,rate,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              fields.student_id[0],
              fields.faculty_id[0],
              fields.school_id[0],
              fields.title[0],
              fields.rate[0],
             
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
 
   async updateFeedbackById( req, res) {
     try {
     
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
       
       
        const data = await sequelize.query(
          "UPDATE `feedback` SET title=?,rate=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              req.body.feedback,
              req.body.rate,
            
              "STUDENT",
              currentTime,
               req.body.feedback_id,
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
   async addFeedbackById( req, res) {
     try {
         const currentTime = getDate("YYYY-MM-DD hh:mm");
console.log(req.body);
        const uniqueNum = uuidv4();
       

        const data = await sequelize.query(
          "INSERT INTO feedback(track_id,student_id,faculty_id,title,rate,created_by,created_at) VALUES (?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              req.body.student_id,
              req.body.faculty_id,
              req.body.title,
              req.body.rate,
             
              "STUDENT",
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
   

    async deleteFeedback(body) {
    try {

      const feedbackId = parseInt(body.feedbackId);
    
     const data = await sequelize.query(
        `DELETE FROM feedback WHERE id = ${feedbackId}`,
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
  async fetchFeedbackById(body) {
    try {
      const feedbackId = parseInt(body.feedbackId);
    
     const data = await sequelize.query(
        `SELECT * FROM feedback WHERE id = ${feedbackId}`,
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
   async viewFeedbackById(body) {
    try {
      const feedbackId = parseInt(body.feedbackId);
      
     const data = await sequelize.query(
        `SELECT feedback.title,feedback.rate,class.class_name,faculty.name as fname,student.name as sname FROM feedback INNER JOIN student ON student.id = feedback.student_id INNER JOIN faculty ON faculty.id = feedback.faculty_id INNER JOIN class ON class.id = student.class_id WHERE feedback.id = ${feedbackId}`,
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
 
   
    async deleteMultipleFeedback(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM feedback WHERE id = (${ids[index]})`,
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
  FeedbackManagement,
};
