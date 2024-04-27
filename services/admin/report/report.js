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

class ReportManagement {
  constructor() {}

    async createCertificate(files, fields, req, res) {
      try {
        const slug = titletoslug(fields.certificate_name[0])
        
        const currentTime = getDate("YYYY-MM-DD hh:mm");
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
        const certificateExist = await sequelize.query(
          "SELECT * FROM certificate WHERE slug =?",
          {
            replacements: [slug],
            type: QueryTypes.SELECT,
          }
          );
        

      if (certificateExist.length > 0) {
        return false;
      } else {
       
        const uniqueNum = uuidv4();
        const dir = path.join(
          __dirname,
          `../../../public/uploads/${fields.certificate_school_id[0]}/document`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.certificate_photo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.certificate_photo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

        const data = await sequelize.query(
          "INSERT INTO certificate(track_id,track_class_id,track_school_id,slug,certificate_name,certificate_desc,certificate_photo,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
          {
            replacements: [
              uniqueNum,
               fields.certificate_class_id[0],
              fields.certificate_school_id[0],
              slug,
              fields.certificate_name[0],
              fields.certificate_desc[0],
              url,
             req.user[0].role,
               currentTime,
            ],
            type: QueryTypes.INSERT,
          }
        );
        // await sendEmail("prabhatpandey181291@gmail.com", "test", "lol");
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
  
   async updateCertificateById(files, fields, req, res) {
     try {
         const slug = titletoslug(fields.certificate_name[0])
        const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
       const currentTime = getDate("YYYY-MM-DD hh:mm");
      if (files.certificate_photo[0].size>0) {
        
         const dir = path.join(
          __dirname,
          `../../../public/uploads/${id}/document`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.certificate_photo[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.certificate_photo[0].filepath, `${dir}/${fileName}`, dir);

        const url = `${fileName}`;

        const data = await sequelize.query(
          "UPDATE certificate SET slug=?,certificate_name=?,certificate_desc=?,certificate_photo=?,updated_by=?,updated_at=? WHERE track_id = ?",
          {
            replacements: [
             slug,
              fields.certificate_name[0],
              fields.certificate_desc[0],
              url,
              req.user[0].role,
              currentTime,
                fields.certificate_id[0],
            ],
            type: QueryTypes.UPDATE,
          }
        );
      
        return true;
      
      } else {
        const data = await sequelize.query(
          "UPDATE certificate SET slug=?,certificate_name=?,certificate_desc=?,updated_by=?,updated_at=? WHERE track_id = ?",
          {
            replacements: [
              slug,
              fields.certificate_name[0],
              fields.certificate_desc[0],
              
              req.user[0].role,
              currentTime,
               fields.certificate_id[0],
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
   async getClass(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      
     
       const data = await sequelize.query(
        `SELECT * FROM class WHERE track_school_id = '${id}'`,
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
  async getCertificate(req,res) {
    try {
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
     
       const data = await sequelize.query(
        `SELECT class.class_name,certificate.track_id,certificate.track_class_id,certificate.track_school_id,certificate.certificate_name,certificate.certificate_desc,certificate.certificate_photo FROM certificate INNER JOIN class ON class.track_id = certificate.track_class_id WHERE certificate.track_school_id = '${id}' AND (certificate_name like "%${
          req.body.search.value
        }%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].track_id}' class='delete_check'>`;
        data[i]["certificate_name"] = `${data[i].certificate_name}`;
        data[i]["certificate_desc"] = `${data[i].certificate_desc}`;
        data[i]["class_name"] = `${data[i].class_name}`;

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editCertificate(${data[i].track_id})' data-id='${data[i].track_id}'> Edit </button> <button class='btn btn-danger btn-sm deleteBtn' onclick='deleteCertificate(${data[i].track_id})' data-id='${data[i].track_id}' > Delete </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewCertificate(${data[i].track_id})' data-id='${data[i].track_id}'> View </button> `;
       
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
    async countCertificate(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
   
       const data = await sequelize.query(
        `SELECT class.class_name,certificate.track_id,certificate.track_class_id,certificate.track_school_id,certificate.certificate_name,certificate.certificate_desc,certificate.certificate_photo FROM certificate INNER JOIN class ON class.track_id = certificate.track_class_id WHERE certificate.track_school_id = '${id}'`,
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
  

    async deleteCertificate(req,res) {
    try {

      const certificateId = req.body.certificateId;
   
     const data = await sequelize.query(
        `DELETE FROM certificate WHERE track_id = '${certificateId}'`,
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
  async fetchCertificateById(req,res) {
    try {
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
   
      const certificateId = req.body.certificateId;
     
     const data = await sequelize.query(
        `SELECT * FROM certificate WHERE track_id = '${certificateId}'`,
        {
          type: QueryTypes.SELECT,
         
        }
      );
       const classes = await sequelize.query(
        `SELECT * FROM class WHERE class.track_school_id = '${id}'`,
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
   async viewCertificateById(req,res) {
    try {
      const certificateId = req.body.certificateId;
     
     const data = await sequelize.query(
        `SELECT class.class_name,certificate.track_id,certificate.track_class_id,certificate.track_school_id,certificate.certificate_name,certificate.certificate_desc,certificate.certificate_photo FROM certificate INNER JOIN class ON class.track_id = certificate.track_class_id WHERE certificate.track_id = '${certificateId}'`,
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
  
    async deleteMultipleCertificate(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM certificate WHERE track_id = ('${ids[index]}')`,
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
 
 async fetchStudentByClass(req) {
     try {
       
       const classId = req.body.classId;
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
       
       const studentData = await sequelize.query(
         `SELECT * FROM student WHERE track_class_id = '${classId}' AND track_school_id = '${id}'`,
         {
           type: QueryTypes.SELECT,
           
          }
          );
        
          return studentData;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
  async fetchStudentReportByClass(req,res) {
     try {
       
       const classId = req.body.classId;
       const studentId = req.body.studentId;
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
       
       const studentData = await sequelize.query(
         `SELECT * FROM student INNER JOIN  exam_status ON  exam_status.track_student_id = student.track_id  INNER JOIN  exam ON  exam.track_id = exam_status.track_exam_id WHERE student.track_class_id = '${classId}' AND student.track_school_id = '${id}' AND exam_status.track_student_id = '${studentId}' AND DATE_FORMAT(exam_status.created_at, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') AND  exam_status.exam_status='completed'`,
         {
           type: QueryTypes.SELECT,
           
          }
          );
        
          return studentData;
console.log("LLLLLLLLLL",studentData);
    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async getClass(req) {
     try {
       
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
       
       const data = await sequelize.query(
         `SELECT * FROM class WHERE track_school_id = '${id}'`,
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
  ReportManagement,
};
