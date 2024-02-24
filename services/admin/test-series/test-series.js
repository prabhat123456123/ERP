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
  addDate,updateFormat
} = require("../../../utils");
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

class TestManagement {
  constructor() {}

   async getCompletedQuizTest(req,res) {
    try {
   const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
    
      const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "quiz" AND exam_status = "completed" AND exam.school_id = ${id} AND ` + whereClause + `(exam_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       data[i]["name"] = `${data[i].exam_name}`;
        data[i]["startDate"] = updateFormat(
                  moment(data[i].start_date),
                  "YYYY-MM-DD"
                );
        data[i]["endDate"] =  updateFormat(
                  moment(data[i].end_date),
                  "YYYY-MM-DD"
                );
        data[i]["mode"] = `<h5 style="color:green">Quiz</h5>`;
        data[i]["totalMarks"] = `${data[i].total_marks}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='viewExplaination(${data[i].id})' data-id='${data[i].id}' >View Explaination </button> `;
       
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
    async getQuestionExamWise(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM question INNER JOIN exam ON exam.id = question.exam_id where exam_id = ${body.examId}`,
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
    async viewExplaination(body) {
    try {

       const data = await sequelize.query(
        `SELECT * FROM question INNER JOIN exam ON exam.id = question.exam_id where exam_id = ${body.examId}`,
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
    async countCompletedQuizTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "quiz" AND exam_status = "completed" AND exam.school_id = ${id} AND ` + whereClause,
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

   async getNewQuizTest(req,res) {
     try {
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
 const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "quiz" AND exam_status = "new" AND exam.school_id = ${id} AND ` + whereClause + `(exam_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       data[i]["name"] = `${data[i].exam_name}`;
         data[i]["startDate"] = updateFormat(
                  moment(data[i].start_date),
                  "YYYY-MM-DD"
                );
        data[i]["endDate"] =  updateFormat(
                  moment(data[i].end_date),
                  "YYYY-MM-DD"
                );
        data[i]["mode"] = `<h5 style="color:green">Quiz</h5>`;
        data[i]["totalMarks"] = `${data[i].total_marks}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='startExam(${data[i].id})' data-id='${data[i].id}' >Start Quiz </button> `;
       
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
    async countNewQuizTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "quiz" AND exam_status = "new" AND exam.school_id = ${id} AND ` + whereClause,
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

   async getNewPracticeTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "practice" AND exam_status = "new" AND exam.school_id = ${id} AND ` + whereClause + `(exam_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       data[i]["name"] = `${data[i].exam_name}`;
       data[i]["startDate"] = updateFormat(
                  moment(data[i].start_date),
                  "YYYY-MM-DD"
                );
        data[i]["endDate"] =  updateFormat(
                  moment(data[i].end_date),
                  "YYYY-MM-DD"
                );
        data[i]["mode"] = `<h5 style="color:green">Practice</h5>`;
        data[i]["totalMarks"] = `${data[i].total_marks}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='startExam(${data[i].id})' data-id='${data[i].id}' >Start Exam </button> `;
       
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
    async countNewPracticeTest(req,res) {
    try {
 const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "practice" AND exam_status = "new" AND exam.school_id = ${id} AND ` + whereClause,
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

   async getCompletedPracticeTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
     const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "practice" AND exam_status = "completed" AND exam.school_id = ${id} AND ` + whereClause + `(exam_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       data[i]["name"] = `${data[i].exam_name}`;
         data[i]["startDate"] = updateFormat(
                  moment(data[i].start_date),
                  "YYYY-MM-DD"
                );
        data[i]["endDate"] =  updateFormat(
                  moment(data[i].end_date),
                  "YYYY-MM-DD"
                );
        data[i]["mode"] = `<h5 style="color:green">Practice</h5>`;
        data[i]["totalMarks"] = `${data[i].total_marks}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='viewExplaination(${data[i].id})' data-id='${data[i].id}' > View Explaination </button> `;
       
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
    async countCompletedPracticeTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "practice" AND exam_status = "completed" AND exam.school_id = ${id} AND ` + whereClause,
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

   async getCompletedFulllengthTest(req,res) {
     try {
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
//  console.log(sequelize)
     const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "online" AND exam_status = "completed" AND exam.school_id = ${id} AND ` + whereClause + `(exam_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       data[i]["name"] = `${data[i].exam_name}`;
        data[i]["startDate"] = updateFormat(
                  moment(data[i].start_date),
                  "YYYY-MM-DD"
                );
        data[i]["endDate"] =  updateFormat(
                  moment(data[i].end_date),
                  "YYYY-MM-DD"
                );
        data[i]["mode"] = `<h5 style="color:green">Online</h5>`;
        data[i]["totalMarks"] = `${data[i].total_marks}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='viewExplaination(${data[i].id})' data-id='${data[i].id}' > View Explaination </button> `;
       
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
    async countCompletedFulllengthTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "online" AND exam_status = "completed" AND exam.school_id = ${id} AND ` + whereClause,
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

   async getNewFulllengthTest(req,res) {
    try {
//  console.log(sequelize)
       const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "online" AND exam_status = "new" AND exam.school_id = ${id} AND ` + whereClause + `(exam_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
       data[i]["name"] = `${data[i].exam_name}`;
        data[i]["startDate"] = updateFormat(
                  moment(data[i].start_date),
                  "YYYY-MM-DD"
                );
        data[i]["endDate"] =  updateFormat(
                  moment(data[i].end_date),
                  "YYYY-MM-DD"
                );
        data[i]["mode"] = `<h5 style="color:green">Online</h5>`;
        data[i]["totalMarks"] = `${data[i].total_marks}`;

        data[i][
          "action"
        ] = `<button class='btn btn-success btn-sm' onclick='startExam(${data[i].id})' data-id='${data[i].id}' > Start Exam </button> `;
       
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
    async countNewFulllengthTest(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].id : req.user[0].school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.class_id = ${req.user[0].class_id} `
      }
       const data = await sequelize.query(
        `SELECT id,exam_name,start_date,end_date,total_marks FROM exam WHERE exam_mode = "online" AND exam_status = "new" AND exam.school_id = ${id} AND ` + whereClause,
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
   async getFullLengthQuestion(body) {
    try {

       const data = await sequelize.query(
        `SELECT * FROM question INNER JOIN exam ON exam.id = question.exam_id where exam_id = ${body.examId}`,
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
   async getPrevQuestion(body) {
    try {
 const data = await sequelize.query(
        `SELECT question.id,exam.exam_status,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id where question.exam_id = ${body.examId}`,
        {
          type: QueryTypes.SELECT,
        }
      );
       const currentQuestion = await sequelize.query(
        `SELECT question.id,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id where question.exam_id = ${body.examId} AND question.id=${body.questionId}`,
        {
          type: QueryTypes.SELECT,
        }
      );
         // Find the index of the current question in the array
  const currentIndex = data.findIndex(e=>e.id === currentQuestion[0].id);

  // Calculate the IDs of the previous and next questions
  const previousQuestionId = currentIndex > 0 ? data[currentIndex - 1].id : null;
  const nextQuestionId = currentIndex < data.length - 1 ? data[currentIndex + 1].id : null;
      
     
      return {currentQuestion,previousQuestionId,nextQuestionId};
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }

   async getNextQuestion(body) {
     try {
       const answer = await sequelize.query(
        `SELECT * FROM answer INNER JOIN question ON question.id = answer.question_id where question.exam_id=? AND answer.question_id=?`,
        {
          type: QueryTypes.SELECT,
           replacements: [
             parseInt(body.examId),
         parseInt(body.questionId)
      ],
        }
       );
       if (answer.length) {
         
           await sequelize.query(
          "UPDATE answer SET given_options=?,question_status=? WHERE question_id = ?",
          {
            replacements: [
             
              body.givenOption,
           "saved",
                parseInt(body.questionId)
            ],
            type: QueryTypes.UPDATE,
          }
        );
       } else {
          const currentTime = getDate("YYYY-MM-DD hh:mm");

         await sequelize.query(
          "INSERT INTO answer(student_id,question_id,given_options,question_status,created_by,created_at) VALUES (?,?,?,?,?,?)",
          {
            replacements: [
             "2",
             parseInt(body.questionId),
              body.givenOption,
             "saved",
              "STUDENT",
               currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
      
       }

       
 const data = await sequelize.query(
        `SELECT question.id,exam.exam_status,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id where question.exam_id=?`,
        {
          type: QueryTypes.SELECT,
           replacements: [
            parseInt(body.examId)
       
      ],
        }
      );
      
       const currentQuestion = await sequelize.query(
        `SELECT question.id,exam.exam_status,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id where question.exam_id=? AND question.id=?`,
        {
          type: QueryTypes.SELECT,
           replacements: [
            parseInt(body.examId),
         parseInt(body.questionId)
      ],
        }
      );
      // Find the index of the current question in the array
  const currentIndex = data.findIndex(e=>e.id === currentQuestion[0].id);
     

  // Calculate the IDs of the previous and next questions
  const previousQuestionId = currentIndex > 0 ? data[currentIndex - 1].id : null;
  const nextQuestionId = currentIndex < data.length - 1 ? data[currentIndex + 1].id : null;
       
  
      return {currentQuestion,previousQuestionId,nextQuestionId};
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }

   async getPracticeQuestion(body) {
    try {
    const data = await sequelize.query(
        `SELECT question.id,exam.exam_status,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id  where question.exam_id = ${body.examId}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      let currentQuestion;
      if (data.length && data[0].exam_status == "new") {
          currentQuestion = await sequelize.query(
        `SELECT question.id,exam.exam_status,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id where answer.question_status="notsaved" AND question.exam_id = ${body.examId} LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );
      }

       if (data.length && data[0].exam_status == "resumed") {
       currentQuestion = await sequelize.query(
        `SELECT question.id,exam.exam_status,question.exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.id = question.exam_id LEFT JOIN answer ON answer.question_id = question.id ORDER BY question.id DESC where answer.question_status="saved" AND question.exam_id = ${body.examId} LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );
        
      }
  // Find the current question based on the provided ID
 

  // Find the index of the current question in the array

  const currentIndex = data.findIndex(e=>e.id === currentQuestion[0].id);
  

  // Calculate the IDs of the previous and next questions
  const previousQuestionId = currentIndex > 0 ? data[currentIndex - 1].id : null;
  const nextQuestionId = currentIndex < data.length - 1 ? data[currentIndex + 1].id : null;
    
      const totalQuestion = data.length;
      return {currentQuestion,previousQuestionId,nextQuestionId,totalQuestion};
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }

 

   async getQuizQuestion(body) {
    try {

       const data = await sequelize.query(
        `SELECT * FROM question INNER JOIN exam ON exam.id = question.exam_id where exam_id = ${body.examId}`,
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

 
 
    async submitExam(body) {
    try {

       const data = await sequelize.query(
        `SELECT * FROM question INNER JOIN exam ON exam.id = question.exam_id where exam_id = ${body.examId}`,
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
  TestManagement,
};
