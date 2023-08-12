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
  generateRandomPassword,
  hashPassword,
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

class AdmissionManagement {
  constructor() {}
   async createStudent(files, fields, req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");

      const userExist = await sequelize.query(
        "SELECT * FROM student WHERE email =? OR phone=?",
        {
          replacements: [fields.student_email[0], fields.student_phone[0]],
          type: QueryTypes.SELECT,
        }
      );

      if (userExist.length > 0) {
        return false;
      } else {
       
       
        const password = await generateRandomPassword();
        const genratedPassword = await hashPassword(password);

        const uniqueNum = uuidv4();
        const dir = path.join(
          __dirname,
          `../../../public/uploads/student/${fields.student_email[0]}`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.student_photo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.student_photo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

        const data = await sequelize.query(
          "INSERT INTO student(track_id,name,email,dob,gender,phone,class_id,school_id,address,fathers_name,mothers_name,parent_phone,hobby,password,photo,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              fields.student_name[0],
              fields.student_email[0],
              fields.student_dob[0],
              fields.student_gender[0],
              fields.student_phone[0],
              fields.student_class_id[0],
              fields.student_school_id[0],
              fields.student_address[0],
              fields.student_father_name[0],
              fields.student_mother_name[0],
              fields.student_parent_phone[0],
              fields.student_hobbies[0],
              genratedPassword,
              url,
           
             
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
  async getAdmission(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,class_id,school_id,name,email,gender FROM student WHERE name like "%${
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
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editAdmission(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteAdmission(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewAdmission(${data[i].id},${data[i].school_id},${data[i].class_id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countStudent(body) {
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
   async updateAdmission(body) {
    try {

      let id = parseInt(body.pk)

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE student SET name=? WHERE id = ${id}`,
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
        `UPDATE student SET email=? WHERE id = ${id}`,
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
        `UPDATE student SET gender=? WHERE id = ${id}`,
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

    async deleteAdmission(body) {
    try {

      const studentId = parseInt(body.studentId);
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `DELETE FROM student WHERE id = ${studentId} AND school_id = ${schoolId}`,
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
  async fetchStudentById(body) {
    try {
      const studentId = parseInt(body.studentId);
      const classId = parseInt(body.classId);
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `SELECT * FROM student WHERE id = ${studentId} AND class_id = ${classId} AND school_id=${schoolId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );
       const classes = await sequelize.query(
        `SELECT * FROM class WHERE id = ${classId} AND school_id=${schoolId}`,
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
   async viewStudentById(body) {
    try {
      const studentId = parseInt(body.studentId);
      const classId = parseInt(body.classId);
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `SELECT student.*,class.class_name,school.school_name FROM student INNER JOIN school ON school.id = student.school_id INNER JOIN class ON class.id = student.class_id WHERE student.id = ${studentId} AND student.class_id = ${classId} AND student.school_id=${schoolId}`,
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
   async updateStudentById(body) {
    try {

      const id = parseInt(body.id);
      const data = await sequelize.query(
        `UPDATE student SET gender=? WHERE id = ${id}`,
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
    async deleteMultiple(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM student WHERE id = (${ids[index]})`,
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
  AdmissionManagement,
};
