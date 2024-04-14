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

class TestManagement {
  constructor() {}

   async getCompletedQuizTest(req,res) {
     try {
       
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}' AND `
      }
//  console.log(sequelize)
     const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "quiz" AND exam_status.exam_status = 'completed' AND exam.track_school_id = '${id}' AND ` + whereClause + `(exam_name like "%${
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
        ] = `<button class='btn btn-success btn-sm viewExplainationBtn' onclick='viewExplaination(${data[i].track_id})' data-id='${data[i].track_id}' >View Explaination </button> `;
       
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
        `SELECT * FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id where track_exam_id = '${body.examId}'`,
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
    async viewExplaination(req,res) {
    try {

       const data = await sequelize.query(
        `SELECT * FROM answer INNER JOIN question ON question.track_id = answer.track_question_id INNER JOIN exam ON exam.track_id = question.track_exam_id where exam.track_id = '${req.body.examId}' AND answer.track_student_id = '${req.user[0].track_id}'`,
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
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "quiz" AND exam_status.exam_status = 'completed' AND exam.track_school_id = '${id}' AND ` + whereClause,
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
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}' AND `
      }
//  console.log(sequelize)
     const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "quiz" AND exam_status.exam_status = 'new' AND exam.track_school_id = '${id}' AND ` + whereClause + `(exam_name like "%${
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
        ] = `<button class='btn btn-success btn-sm newQuizBtn' onclick='startExam(${data[i].track_id})' data-id='${data[i].track_id}' >Start Quiz </button> `;
       
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
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "quiz" AND exam_status.exam_status = 'new' AND exam.track_school_id = '${id}' AND ` + whereClause,
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
   
         const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}' AND `
      }
//  console.log(sequelize)
     const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "practice" AND exam_status.exam_status = 'new' AND exam.track_school_id = '${id}' AND ` + whereClause + `(exam_name like "%${
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
          data[i]["endDate"] = updateFormat(
            moment(data[i].end_date),
            "YYYY-MM-DD"
          );
          data[i]["mode"] = `<h5 style="color:green">Practice</h5>`;
          data[i]["totalMarks"] = `${data[i].total_marks}`;

          data[i][
            "action"
          ] = `<button class='btn btn-success btn-sm newPracticeBtn' onclick='startExam(${data[i].track_id})' data-id='${data[i].track_id}' >Start Exam </button> `;
       
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

     
  
          const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "practice" AND exam_status.exam_status = 'new' AND exam.track_school_id = '${id}' AND ` + whereClause,
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

      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}' AND `
      }

     const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "practice" AND exam_status.exam_status = 'completed' AND exam.track_school_id = '${id}' AND ` + whereClause + `(exam_name like "%${
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
          data[i]["endDate"] = updateFormat(
            moment(data[i].end_date),
            "YYYY-MM-DD"
          );
          data[i]["mode"] = `<h5 style="color:green">Practice</h5>`;
          data[i]["totalMarks"] = `${data[i].total_marks}`;

          data[i][
            "action"
          ] = `<button class='btn btn-success btn-sm viewExplainationBtn' onclick='viewExplaination(${data[i].track_id})' data-id='${data[i].track_id}' >View Explaination </button> `;
       
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
      
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "practice" AND exam_status.exam_status = 'completed' AND exam.track_school_id = '${id}' AND ` + whereClause,
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
     const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}' AND `
      }

     const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "online" AND exam_status.exam_status = 'completed' AND exam.track_school_id = '${id}' AND ` + whereClause + `(exam_name like "%${
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
        ] = `<button class='btn btn-success btn-sm viewExplainationBtn' onclick='viewExplaination(${data[i].track_id})' data-id='${data[i].track_id}' > View Explaination </button> `;
       
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
     const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "online" AND exam_status.exam_status = 'completed' AND exam.track_school_id = '${id}' AND ` + whereClause,
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
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}' AND `
      }

     const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "online" AND exam_status.exam_status = 'new' AND exam.track_school_id = '${id}' AND ` + whereClause + `(exam_name like "%${
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
        ] = `<button class='btn btn-success btn-sm fullNewBtn' onclick='startExam(${data[i].track_id})' data-id='${data[i].track_id}' > Start Exam </button> `;
       
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

       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `exam.track_class_id = '${req.user[0].track_class_id}' AND exam_status.track_student_id='${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT exam.track_id,exam_name,start_date,end_date,total_marks FROM exam INNER JOIN exam_status ON exam_status.track_exam_id = exam.track_id WHERE exam_mode = "online" AND exam_status.exam_status = 'new' AND exam.track_school_id = '${id}' AND ` + whereClause,
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
        `SELECT * FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id where track_exam_id = '${body.examId}'`,
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
  
   async getQuestionByIndex(req,res) {
     try {
        const data = await sequelize.query(
        `SELECT question.track_id,answer.given_options,answer.question_status,question.track_exam_id,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id LEFT JOIN answer ON answer.track_question_id = question.track_id where question.track_exam_id=?`,
        {
          type: QueryTypes.SELECT,
           replacements: [
            req.body.examId
       
      ],
        }
       );
      
       const index = req.body.index;
       let opt = [];
          if (data[index].option_image_one) {
         opt.push(`<img src='/uploads/exam/${data[index].track_exam_id}/${data[index].option_image_one}' style="width:100px">`)
       }
       if (data[index].option_image_two) {
         opt.push(`<img src='/uploads/exam/${data[index].track_exam_id}/${data[index].option_image_two}' style="width:100px">`)
       }
       if (data[index].option_image_three) {
         opt.push(`<img src='/uploads/exam/${data[index].track_exam_id}/${data[index].option_image_three}' style="width:100px">`)
       }
       if (data[index].option_image_four) {
         opt.push(`<img src='/uploads/exam/${data[index].track_exam_id}/${data[index].option_image_four}' style="width:100px">`)
       }
       if (data[index].option_one) {
         opt.push(data[index].option_one)
       }
       if (data[index].option_two) {
         opt.push(data[index].option_two)
       }
       if (data[index].option_three) {
         opt.push(data[index].option_three)
       }
       if (data[index].option_four) {
         opt.push(data[index].option_four)
       }
	if (index >= 0 && index < data.length){
    	const questionData = {
        question: data[index].question_title,
        track_exam_id: data[index].track_exam_id,
        track_id: data[index].track_id,
        given_options: data[index].given_options,
        
        	options: opt
    };

    return {questionData,data};
	} 

     
  
     
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async getAnsweredNotAnswered(req,res) {
     try {
        const data = await sequelize.query(
        `SELECT * FROM answer INNER JOIN question ON question.track_id = answer.track_question_id INNER JOIN exam ON exam.track_id = question.track_exam_id where question.track_exam_id=? AND answer.track_student_id=?`,
        {
          type: QueryTypes.SELECT,
           replacements: [
             req.body.examId,
             req.user[0].track_id
       
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
   async saveNextQuestion(req,res) {
     try {
       const correctAnswer = await sequelize.query(
  `SELECT right_option,right_marks,wrong_marks FROM question WHERE track_id = ?`,
  {
    type: QueryTypes.SELECT,
    replacements: [req.body.questionId],
  }
);

         const givenOption = req.body.givenOption;
         const rightOption = correctAnswer[0].right_option;

        
         let marks = 0; // initialize marks to zero

         // Check if the given option matches the right option
         if (givenOption === rightOption) {
         
           marks = +correctAnswer[0].right_marks; // increment marks for correct answer
         } else {
           marks = -correctAnswer[0].wrong_marks; // increment marks for correct answer
         }
       
          const uniqueNum = uuidv4();
       const answer = await sequelize.query(
         `SELECT * FROM answer INNER JOIN question ON question.track_id = answer.track_question_id where question.track_exam_id=? AND answer.track_question_id=? AND answer.track_student_id=?`,
         {
           type: QueryTypes.SELECT,
           replacements: [
             req.body.examId,
             req.body.questionId,
             req.user[0].track_id,
            ],
          }
       );
       
       if (answer.length) {
        
            await sequelize.query(
          "UPDATE answer SET given_options=?,question_status=?,marks=? WHERE track_question_id = ?",
          {
            replacements: [
             
              req.body.givenOption,
              "saved",
                marks,
                req.body.questionId
            ],
            type: QueryTypes.UPDATE,
          }
        );
        
           return true;
	
       } else {
          const currentTime = getDate("YYYY-MM-DD hh:mm");
      
            await sequelize.query(
          "INSERT INTO answer(track_id,track_student_id,track_question_id,given_options,question_status,marks,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)",
          {
            replacements: [
              uniqueNum,
             req.user[0].track_id,
             req.body.questionId,
              req.body.givenOption,
              "saved",
             marks,
              "STUDENT",
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

   async getPracticeQuestion(body) {
    try {
    const data = await sequelize.query(
        `SELECT question.track_id,question.track_exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id LEFT JOIN answer ON answer.track_question_id = question.track_id  where question.track_exam_id = '${body.examId}'`,
        {
          type: QueryTypes.SELECT,
        }
      );
      let currentQuestion;
      if (data.length && data[0].exam_status == "new") {
          currentQuestion = await sequelize.query(
        `SELECT question.track_id,question.track_exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id LEFT JOIN answer ON answer.track_question_id = question.track_id where answer.question_status="notsaved" AND question.track_exam_id = '${body.examId}' LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );
      }

       if (data.length && data[0].exam_status == "resumed") {
       currentQuestion = await sequelize.query(
        `SELECT question.track_id,question.track_exam_id,answer.given_options,answer.question_status,question.right_marks,question.wrong_marks,question.option_image_one,question.option_image_two,question.option_image_three,question.option_image_four,question.right_option,question.question_title,question.option_one,question.option_two,question.option_three,question.option_four FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id LEFT JOIN answer ON answer.track_question_id = question.track_id ORDER BY question.id DESC where answer.question_status="saved" AND question.track_exam_id = '${body.examId}' LIMIT 1`,
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
        `SELECT * FROM question INNER JOIN exam ON exam.track_id = question.track_exam_id where track_exam_id = '${body.examId}'`,
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

 
 
    async submitExam(req,res) {
    try {
      const uniqueNum = uuidv4();
       const questionsWithAnswers = await sequelize.query(
         `SELECT answer.given_options,question.right_option,question.right_marks,question.wrong_marks FROM answer INNER JOIN question ON question.track_id = answer.track_question_id INNER JOIN exam ON exam.track_id = question.track_exam_id where exam.track_id=? AND answer.track_student_id=?`,
         {
           type: QueryTypes.SELECT,
           replacements: [
             req.body.examId,
             req.user[0].track_id
            ],
          }
      );
      
      
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      
      questionsWithAnswers.forEach(question => {
        if (question.right_option === question.given_options) {
          correctAnswers += parseInt(question.right_marks);
        } else {
          incorrectAnswers += parseInt(question.wrong_marks);
        }
      });
      
      let obtainedMarks = correctAnswers - incorrectAnswers; 
 
      

       const data = await sequelize.query(
         `SELECT * FROM exam_status INNER JOIN exam ON exam.track_id = exam_status.track_exam_id where exam_status.track_exam_id=? AND exam_status.track_student_id=?`,
         {
           type: QueryTypes.SELECT,
           replacements: [
             req.body.examId,
             req.user[0].track_id
            ],
          }
          );
       if (data.length) {
        
            await sequelize.query(
          "UPDATE exam_status SET exam_status=?,correct_marks=?,incorrect_marks=?,obtained_marks=? WHERE exam_status.track_exam_id=? AND exam_status.track_student_id=?",
          {
            replacements: [
              "completed",
              correctAnswers,
              incorrectAnswers,
              obtainedMarks,
             req.body.examId,
             req.user[0].track_id
            ],
            type: QueryTypes.UPDATE,
          }
        );
        
           return true;
	
       } else {
          const currentTime = getDate("YYYY-MM-DD hh:mm");
      
            await sequelize.query(
          "INSERT INTO exam_status(track_id,track_exam_id,track_student_id,exam_status,correct_marks,incorrect_marks,obtained_marks,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
              uniqueNum,
           req.body.examId,
             req.user[0].track_id,
              "completed",
             correctAnswers,
              incorrectAnswers,
              obtainedMarks,
              "STUDENT",
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
 
}

module.exports = {
  TestManagement,
};
