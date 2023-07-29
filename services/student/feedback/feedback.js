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

class FeedbackManagement {
  constructor() {}

  async getFeedback(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,name,email,gender FROM student WHERE name like "%${
          body.search.value
        }%" OR email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
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
        ] = `<button class='btn btn-danger btn-sm delBtn' data-id='${data[i].id}' > Delete </button>`;
       
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
  async saveFeedback(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,name,email,gender FROM student WHERE name like "%${
          body.search.value
        }%" OR email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
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
        ] = `<button class='btn btn-danger btn-sm delBtn' data-id='${data[i].id}' > Delete </button>`;
       
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
  async editFeedback(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,name,email,gender FROM student WHERE name like "%${
          body.search.value
        }%" OR email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
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
        ] = `<button class='btn btn-danger btn-sm delBtn' data-id='${data[i].id}' > Delete </button>`;
       
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
  async updateFeedback(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,name,email,gender FROM student WHERE name like "%${
          body.search.value
        }%" OR email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
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
        ] = `<button class='btn btn-danger btn-sm delBtn' data-id='${data[i].id}' > Delete </button>`;
       
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
  async deleteFeedback(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,name,email,gender FROM student WHERE name like "%${
          body.search.value
        }%" OR email like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
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
        ] = `<button class='btn btn-danger btn-sm delBtn' data-id='${data[i].id}' > Delete </button>`;
       
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
   
  
 
}

module.exports = {
  FeedbackManagement,
};
