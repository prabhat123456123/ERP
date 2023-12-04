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
  updateFormat,
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
        console.log(fields);
        return false;
      } else {
        const uniqueNum = uuidv4();
     
         const data = await sequelize.query(
          "INSERT INTO exam(track_id,slug,exam_name,school_id,class_id,subject_id,exam_mode,exam_type,start_date, end_date,total_marks, created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              slug,
              fields.exam_name[0],
              parseInt(fields.school_id[0]),
              parseInt(fields.class_id[0]),
             parseInt(fields.subject_id[0]),
              fields.exam_mode[0],
              fields.exam_type[0],
              fields.start_date[0],
              fields.end_date[0],
              fields.total_marks[0],
             
              "SCHOOL",
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
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editExam(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteExam(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewExam(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > View </button> <a href="/exam/examWiseQuestion/${data[i].id}" class='btn btn-success btn-sm' data-id='${data[i].id}' > Go To Question Section </a> `;
       
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
  async getSubject(req,res) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM subject`,
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
     const examData = await sequelize.query(
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
      
        const data = []

      const exam = {
        exam_name:examData[0].exam_name,
        class_id:examData[0].class_id,
        type_exam:examData[0].type_exam,
        start_date: updateFormat(
                  moment(examData[0].start_date),
                  "YYYY-MM-DD"
        ),
        end_date: updateFormat(
                  moment(examData[0].end_date),
                  "YYYY-MM-DD"
        ),
      }
      data.push(exam)
    
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
   
 
 
  async updateExamById( req, res) {
    try {
    
       const currentTime = getDate("YYYY-MM-DD hh:mm");
      
        const data = await sequelize.query(
          "UPDATE `exam` SET exam_name=?,class_id=?,start_date=?,end_date=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              req.body.exam_name,
               req.body.class_id,
               req.body.start_date,
               req.body.end_date,
             
              "Faculty",
              currentTime,
                req.body.exam_id,
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
  
   async createQuestion(files, fields, req, res) {
     try {
       console.log(fields);
      
      const currentTime = getDate("YYYY-MM-DD hh:mm");

       
        const dir = path.join(
          __dirname,
          `../../../public/uploads/exam/${fields.exam_id[0]}`
        );

        let optionImage1 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
        files.option_image_one[0].originalFilename.toString().replace(/\s/g, "-");
      
       let optionImage2 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
        files.option_image_two[0].originalFilename.toString().replace(/\s/g, "-");
      
       let optionImage3 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
        files.option_image_three[0].originalFilename.toString().replace(/\s/g, "-");
      
       let optionImage4 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.option_image_four[0].originalFilename.toString().replace(/\s/g, "-");
   

        copyFiles(files.option_image_one[0].filepath, `${dir}/${optionImage1}`, dir);
        copyFiles(files.option_image_two[0].filepath, `${dir}/${optionImage2}`, dir);
        copyFiles(files.option_image_three[0].filepath, `${dir}/${optionImage3}`, dir);
        copyFiles(files.option_image_four[0].filepath, `${dir}/${optionImage4}`, dir);

      

        const data = await sequelize.query(
          "INSERT INTO question(exam_id,question_title,option_one,option_two,option_three,option_four,option_image_one,option_image_two,option_image_three,option_image_four,right_option,right_marks,wrong_marks,created_by,created_at)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
              parseInt(fields.exam_id[0]),
              fields.question_title[0],
              fields.option_one[0],
              fields.option_two[0],
              fields.option_three[0],
              fields.option_four[0],
             optionImage1,
             optionImage2,
             optionImage3,
             optionImage4,
              fields.right_option[0],
              fields.right_marks[0],
              fields.wrong_marks[0],
          
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
 
   async updateQuestionById(files, fields, req, res) {
     try {
      
       const currentTime = getDate("YYYY-MM-DD hh:mm");
      if (files.option_image_one[0].size>0 && files.option_image_two[0].size>0 && files.option_image_three[0].size>0 && files.option_image_four[0].size>0) {
        
     
        const dir = path.join(
          __dirname,
          `../../../public/uploads/exam/${fields.exam_id[0]}`
        );

        let optionImage1 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
        files.option_image_one[0].originalFilename.toString().replace(/\s/g, "-");
      
       let optionImage2 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
        files.option_image_two[0].originalFilename.toString().replace(/\s/g, "-");
      
       let optionImage3 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
        files.option_image_three[0].originalFilename.toString().replace(/\s/g, "-");
      
       let optionImage4 =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.option_image_four[0].originalFilename.toString().replace(/\s/g, "-");
   

        copyFiles(files.option_image_one[0].filepath, `${dir}/${optionImage1}`, dir);
        copyFiles(files.option_image_two[0].filepath, `${dir}/${optionImage2}`, dir);
        copyFiles(files.option_image_three[0].filepath, `${dir}/${optionImage3}`, dir);
        copyFiles(files.option_image_four[0].filepath, `${dir}/${optionImage4}`, dir);


        const data = await sequelize.query(
          "UPDATE question SET question_title=?,option_one=?,option_two=?,option_three=?,option_four=?,option_image_one=?,option_image_two=?,option_image_three=?,option_image_four=?,right_option=?,right_marks=?,wrong_marks=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
             
              fields.question_title[0],
              fields.option_one[0],
              fields.option_two[0],
              fields.option_three[0],
              fields.option_four[0],
             optionImage1,
             optionImage2,
             optionImage3,
             optionImage4,
              fields.right_option[0],
              fields.right_marks[0],
              fields.wrong_marks[0],
             
              "SCHOOL",
              currentTime,
                fields.questionId[0],
            ],
            type: QueryTypes.UPDATE,
          }
        );
      
        return true;
      
      } else {
        const data = await sequelize.query(
          "UPDATE `question` SET question_title=?,option_one=?,option_two=?,option_three=?,option_four=?,right_option=?,right_marks=?,wrong_marks=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              fields.question_title[0],
              fields.option_one[0],
              fields.option_two[0],
              fields.option_three[0],
              fields.option_four[0],
              fields.right_option[0],
              fields.right_marks[0],
              fields.wrong_marks[0],
            
              "SCHOOL",
              currentTime,
               fields.questionId[0],
            ],
            type: QueryTypes.UPDATE,
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
 
  async getQuestion(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT question.id,exam.exam_name,question.question_title FROM question INNER JOIN exam ON exam.id = question.exam_id WHERE question_title like "%${
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
        data[i]["exam"] = `${data[i].exam_name}`;
        data[i]["question"] = `${data[i].question_title}`;
      
        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editQuestion(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteQuestion(${data[i].id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewQuestion(${data[i].id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countQuestion(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM question`,
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
   async updateQuestion(body) {
    try {

      let id = parseInt(body.pk)

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE question SET name=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
        );
          return data;
      }
       if (body.name == "email") {
         const data = await sequelize.query(
        `UPDATE question SET email=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
       if (body.name == "gender") {
         const data = await sequelize.query(
        `UPDATE question SET gender=? WHERE id = ${id}`,
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

    async deleteQuestion(body) {
    try {

      const questionId = parseInt(body.questionId);
   
     const data = await sequelize.query(
        `DELETE FROM question WHERE id = ${questionId}`,
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
  async fetchQuestionById(body) {
    try {
      const questionId = parseInt(body.questionId);
     
     const data = await sequelize.query(
        `SELECT * FROM question WHERE id = ${questionId}`,
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
   async viewQuestionById(body) {
    try {
      const questionId = parseInt(body.questionId);
     
     const data = await sequelize.query(
        `SELECT *  FROM question  WHERE id = ${questionId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );
      console.log(data);
          return data;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 
 
    async deleteMultipleQuestion(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM question WHERE id = (${ids[index]})`,
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
  
  async createSubjectMarks( files,fields, req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");
      const dataNum = fields.lenghtMarks[0].split(",");
    console.log(fields)
      
      console.log(dataNum);
      for (let i = 1; i <= dataNum.length; i++) {

       const data = await sequelize.query(
          "INSERT INTO subject_marks(student_id,subject_id,total_marks,obtained_marks,passing_marks,created_by,created_at) VALUES (?,?,?,?,?,?,?)",
          {
            replacements: [
              
            
               fields.studentId[0],
              fields["subject"+i][0],
               fields["total_marks"+i][0],
               fields["obtained_marks"+i][0],
               fields["passing_marks"+i][0],
             
              "SCHOOL",
               currentTime,
            ],
            type: QueryTypes.INSERT,
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
  
   async updateSubjectMarksById(body) {
     try {
      
       const currentTime = getDate("YYYY-MM-DD hh:mm");
    
        const data = await sequelize.query(
          "UPDATE subject SET class_id=?, subject_name=?,updated_by=?,updated_at=? WHERE id = ?",
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
  
  async getSubjectMarks(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT subject_marks.id,student.name,subject_marks.total_marks,subject_marks.passing_marks,subject.subject_name,subject_marks.obtained_marks FROM subject_marks INNER JOIN subject ON subject.id = subject_marks.subject_id INNER JOIN student ON student.id = subject_marks.student_id WHERE name like "%${
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
        data[i]["name"] = `${data[i].name}`;
        data[i]["subject"] = `${data[i].subject_name}`;
        data[i]["total"] = `${data[i].total_marks}`;
        data[i]["obtained"] = `${data[i].obtained_marks}`;
        data[i]["pass"] = `${data[i].passing_marks}`;
      

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editSubjectMarks(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteSubjectMarks(${data[i].id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewSubjectMarks(${data[i].id})' data-id='${data[i].id}' > View Marks </button>`;
       
      }
console.log(data);

      return data;
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
    async countSubjectMarks(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM subject_marks`,
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
     async getClass(body) {
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
   async updateSubjectMarks(body) {
    try {

      let id = parseInt(body.pk)

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE subject SET subject_name=? WHERE id = ${id}`,
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

    async deleteSubjectMarks(body) {
    try {

      const subjectId = parseInt(body.subjectId);
   
     const data = await sequelize.query(
        `DELETE FROM subject WHERE id = ${subjectId}`,
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
  async fetchSubjectMarksById(body) {
    try {
      const subjectId = parseInt(body.subjectId);
     
     const data = await sequelize.query(
        `SELECT * FROM subject WHERE id = ${subjectId}`,
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
   async viewSubjectMarksById(body) {
    try {
      const subjectId = parseInt(body.subjectId);
     
     const data = await sequelize.query(
        `SELECT * FROM subject WHERE id = ${subjectId}`,
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
 

    async deleteMultipleSubjectMarks(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM subject WHERE id = (${ids[index]})`,
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
  ExamManagement,
};
