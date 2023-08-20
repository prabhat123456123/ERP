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
  titletoslug
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

class ExamManagement {
  constructor() {}

async createExam(files, fields, req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");

      const slug  = titletoslug(fields.exam_name[0])
      const userExist = await sequelize.query(
        "SELECT * FROM exam WHERE slug=?",
        {
          replacements: [ slug],
          type: QueryTypes.SELECT,
        }
      );

      if (userExist.length > 0) {
        return false;
      } else {
       

        const uniqueNum = uuidv4();
     

         const data = await sequelize.query(
          "INSERT INTO exam(track_id,slug,exam_name,school_id,class_id,type_exam,start_date, end_date, created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              slug,
              fields.exam_name[0],
              fields.school_id[0],
              fields.class_id[0],
              fields.type_exam[0],
              fields.start_date[0],
              fields.end_date[0],
             
              "exam",
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
   async getExam(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT exam.id,exam.school_id,exam.exam_name,class.id as class_id,class.class_name FROM exam INNER JOIN class ON class.id = exam.class_id WHERE exam.exam_name like "%${
          body.search.value
        }%" OR class.class_name like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

     for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["exam_name"] = `${data[i].exam_name}`;
        data[i]["class_name"] = `${data[i].class_name}`;
      
        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editExam(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteExam(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewExam(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countExam(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM exam`,
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
   async updateExam(body) {
    try {
 console.log(body)
      let id = parseInt(body.pk)

      if (body.name === "exam_name") {
         const data = await sequelize.query(
        `UPDATE exam SET exam_name=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
        );
          return data;
      }
       if (body.name == "class_id") {
         const data = await sequelize.query(
        `UPDATE exam SET class_id=? WHERE id = ${id}`,
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
    async deleteExam(body) {
    try {

      const id = parseInt(body.examId);
     const data = await sequelize.query(
        `DELETE FROM exam WHERE id = ${id}`,
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
    async deleteMultipleExam(body) {
    try {


      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM exam WHERE id = (${ids[index]})`,
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
   async fetchExamById(body) {
    try {
      const examId = parseInt(body.examId);
      const classId = parseInt(body.classId);
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `SELECT * FROM exam WHERE id = ${examId} AND class_id = ${classId} AND school_id=${schoolId}`,
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
   async viewExamById(body) {
    try {
      const examId = parseInt(body.examId);
      const classId = parseInt(body.classId);
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `SELECT exam.*, class.class_name FROM exam INNER JOIN class ON class.id = exam.class_id WHERE exam.id = ${examId} AND exam.class_id = ${classId} AND exam.school_id=${schoolId}`,
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
   
 
   async updateExamById(body) {
    try {

      const id = parseInt(body.id);
      const data = await sequelize.query(
        `UPDATE exam SET gender=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
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
  async updateExamId(files, fields, req, res) {
     try {
        console.log(fields)
        console.log(files.student_photo[0].size)
       const currentTime = getDate("YYYY-MM-DD hh:mm");
      
              
        const data = await sequelize.query(
          "UPDATE `exam` SET exam_name=?,class_id=?,school_id=?updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              fields.exam_name[0],
              fields.class_id[0],
              fields.school_id[0],
             
              "Faculty",
              currentTime,
               fields.exam_id[0],
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
  
 
}

module.exports = {
  ExamManagement,
};
