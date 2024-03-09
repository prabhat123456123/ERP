const sequelize = require("../../../config/database");
const { QueryTypes, Sequelize } = require("sequelize");
// const {
//   ErrorHandler,
//   statusCodes,
//   casbinEnforcer,
//   actionLogger,
// } = require("../../../helper");
const ExcelJS = require('exceljs');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const {
  copyFiles,
  getDate,
  generateRandomPassword,
  hashPassword,
} = require("../../../utils");
const csv = require("csvtojson");
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

class SubjectManagement {
  constructor() {}
   async createSubject( files,fields, req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");
  const uniqueNum = uuidv4();

        const data = await sequelize.query(
          "INSERT INTO subject(track_id,track_class_id,subject_name,created_by,created_at) VALUES (?,?,?,?,?)",
          {
            replacements: [
              uniqueNum,
             fields.classesId[0],
               fields.subject_name[0],
             
              "SCHOOL",
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
  
   async updateSubjectById(body) {
     try {
      
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
        const data = await sequelize.query(
          "UPDATE subject SET track_class_id=?, subject_name=?,updated_by=?,updated_at=? WHERE track_id = ?",
          {
            replacements: [
             
              body.classesId,
              body.subject_name,
           
              "SCHOOL",
              currentTime,
                body.subjectId,
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
  
  async getSubject(req,res) {
    try {
//  console.log(sequelize)
const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      
     
       const data = await sequelize.query(
        `SELECT subject.track_id,subject.subject_name,class.class_name FROM subject INNER JOIN class ON class.track_id = subject.track_class_id WHERE class.track_school_id = '${id}' AND subject_name like "%${
          req.body.search.value
        }%" LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].track_id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].class_name}`;
        data[i]["subject"] = `${data[i].subject_name}`;
      

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editSubject(${data[i].track_id})' data-id='${data[i].track_id}' > Edit </button> <button class='btn btn-danger btn-sm deleteBtn' onclick='deleteSubject(${data[i].track_id})' data-id='${data[i].track_id}' > Delete </button>`;
       
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
    async countSubject(req,res) {
    try {
const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id

     
       const data = await sequelize.query(
        `SELECT subject.track_id,subject.subject_name,class.class_name FROM subject INNER JOIN class ON class.track_id = subject.track_class_id WHERE class.track_school_id = '${id}'`,
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
     async getClass(req,res) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM class WHERE track_school_id = '${req.user[0].track_id}'`,
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
   async updateSubject(body) {
    try {

      let id = body.pk;

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE subject SET subject_name=? WHERE track_id = '${id}'`,
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

    async deleteSubject(body) {
    try {

      const subjectId = body.subjectId;
   
     const data = await sequelize.query(
        `DELETE FROM subject WHERE track_id = '${subjectId}'`,
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
  async fetchSubjectById(body) {
    try {
      const subjectId = body.subjectId;
     
     const data = await sequelize.query(
        `SELECT * FROM subject WHERE track_id = '${subjectId}'`,
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
   async viewSubjectById(body) {
    try {
      const subjectId = body.subjectId;
     
     const data = await sequelize.query(
        `SELECT * FROM subject WHERE track_id = '${subjectId}'`,
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
 

    async deleteMultipleSubject(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM subject WHERE track_id = ('${ids[index]}')`,
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
  SubjectManagement,
};
