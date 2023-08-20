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

class FacultyManagement {
  constructor() {}
   async createFaculty(files, fields, req, res) {
    try {

      const currentTime = getDate("YYYY-MM-DD hh:mm");

      const userExist = await sequelize.query(
        "SELECT * FROM faculty WHERE email =? OR phone=?",
        {
          replacements: [fields.email[0], fields.phone[0]],
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
          `../../../public/uploads/teacher/${fields.email[0]}`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.photo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.photo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

         const data = await sequelize.query(
          "INSERT INTO faculty(track_id,school_id,name,mothers_name,fathers_name,email,dob,phone,address,gender,experience,qualification,specialize,password,photo,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
             
              uniqueNum,
              fields.school_id[0],
              fields.name[0],
              fields.mother_name[0],
              fields.father_name[0],
              fields.email[0],
              fields.dob[0],
              fields.phone[0],
              fields.address[0],
              fields.gender[0],
              fields.experience[0],
              fields.qualification[0],
              fields.specialize[0],
              genratedPassword,
              url,
           
             
              "Faculty",
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
   async getFaculty(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT id,school_id,name,email,gender FROM faculty WHERE name like "%${
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
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editFaculty(${data[i].id},${data[i].school_id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteFaculty(${data[i].id},${data[i].school_id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewFaculty(${data[i].id},${data[i].school_id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countFaculty(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM faculty`,
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
   async updateFacultyData(body) {
    try {
 console.log(body)
      let id = parseInt(body.pk)

      if (body.name === "name") {
         const data = await sequelize.query(
        `UPDATE faculty SET name=? WHERE id = ${id}`,
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
        `UPDATE faculty SET email=? WHERE id = ${id}`,
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
        `UPDATE faculty SET gender=? WHERE id = ${id}`,
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

    async deleteFacultyData(body) {
    try {

      const id = parseInt(body.facultyId);
     const data = await sequelize.query(
        `DELETE FROM faculty WHERE id = ${id}`,
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
    async deleteMultipleFacultyData(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM faculty WHERE id = (${ids[index]})`,
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
   async fetchFacultyById(body) {
    try {
      const facultyId = parseInt(body.facultyId);
      
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `SELECT * FROM faculty WHERE id = ${facultyId} AND school_id=${schoolId}`,
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
   async viewFacultyById(body) {
    try {
      const facultyId = parseInt(body.facultyId);
      const schoolId = parseInt(body.schoolId);
     const data = await sequelize.query(
        `SELECT faculty.*,school.school_name FROM faculty INNER JOIN school ON school.id = faculty.school_id WHERE faculty.id = ${facultyId} AND faculty.school_id=${schoolId}`,
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
   
 
   async updateFacultyById(body) {
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
  async updateFacultyId(files, fields, req, res) {
     try {
        console.log(fields)
        console.log(files.faculty_photo[0].size)
       const currentTime = getDate("YYYY-MM-DD hh:mm");
      if (files.faculty_photo[0].size>0) {
        
        const dir = path.join(
          __dirname,
          `../../../public/uploads/faculty/${fields.email[0]}`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.faculty_photo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.faculty_photo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

        const data = await sequelize.query(
          "UPDATE faculty SET name=?,email=?,dob=?,gender=?,phone=?,address=?,fathers_name=?,mothers_name=?,experience=?,qualification=?,specialize=?,photo=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
             
              fields.name[0],
              fields.email[0],
              fields.dob[0],
              fields.gender[0],
              fields.phone[0],
              fields.address[0],
              fields.father_name[0],
              fields.mother_name[0],
              fields.experience[0],
              fields.qualification[0],
              fields.specialize[0],
             
              url,
              "Faculty",
              currentTime,
                fields.faculty_id[0],
            ],
            type: QueryTypes.UPDATE,
          }
        );
      
        return true;
      
      } else {
        
     
       
       const data = await sequelize.query(
          "UPDATE faculty SET name=?,email=?,dob=?,gender=?,phone=?,address=?,fathers_name=?,mothers_name=?,experience=?,qualification=?,specialize=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
             
              fields.name[0],
              fields.email[0],
              fields.dob[0],
              fields.gender[0],
              fields.phone[0],
           
             
              fields.address[0],
              fields.father_name[0],
              fields.mother_name[0],
              fields.experience[0],
              fields.qualification[0],
              fields.specialize[0],
             
              "Faculty",
              currentTime,
                fields.faculty_id[0],
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
}

module.exports = {
  FacultyManagement,
};
