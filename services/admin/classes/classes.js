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

class ClassesManagement {
  constructor() {}
   async createClasses( files,fields,req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");

        const data = await sequelize.query(
          "INSERT INTO class(school_id,class_name,annual_fee,created_by,created_at) VALUES (?,?,?,?,?)",
          {
            replacements: [
             
             
             fields.school_id[0],
              fields.class_name[0],
              fields.annual_fee[0],
            
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
 
   async updateClassesById(body) {
     try {
    
        const data = await sequelize.query(
          "UPDATE class SET class_name=?, annual_fee=? WHERE id = ?",
          {
            replacements: [
             
              body.class_name,
              body.annual_fee,
             
                parseInt(body.classesId),
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
   
  async getClasses(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,class_name,annual_fee FROM class WHERE class_name like "%${
          body.search.value
        }%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].class_name}`;
        data[i]["fee"] = `${data[i].annual_fee}`;
      

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editClasses(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteClasses(${data[i].id})' data-id='${data[i].id}' > Delete </button> <a href="/subject/subject/${data[i].id}" class='btn btn-success btn-sm' data-id='${data[i].id}' > View Subject</a> `;
       
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
    async countClasses(body) {
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
   async updateClasses(body) {
    try {

      let id = parseInt(body.pk)

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE classes SET class_name=? WHERE id = ${id}`,
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

    async deleteClasses(body) {
    try {

      const classesId = parseInt(body.classesId);
   
     const data = await sequelize.query(
        `DELETE FROM class WHERE id = ${classesId}`,
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
  async fetchClassesById(body) {
    try {
      const classesId = parseInt(body.classesId);
     
     const data = await sequelize.query(
        `SELECT * FROM Class WHERE id = ${classesId}`,
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
   async viewClassesById(body) {
    try {
      const classesId = parseInt(body.classesId);
     
     const data = await sequelize.query(
        `SELECT * FROM classes WHERE id = ${classesId}`,
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

  
  
    async deleteMultipleClasses(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM class WHERE id = (${ids[index]})`,
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
  ClassesManagement,
};
