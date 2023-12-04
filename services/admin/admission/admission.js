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
   async bulkCreateStudent(files, fields, req, res) {
     try {
     
      const currentTime = getDate("YYYY-MM-DD hh:mm");

        const dir = path.join(
          __dirname,
          `../../../public/uploads/student`
        );

        let fileName =
          new Date().toISOString().replace(/:/g, "-") +
          "-" +
          files.file[0].originalFilename.toString().replace(/\s/g, "-");

        copyFiles(files.file[0].filepath, `${dir}/${fileName}`, dir);

        // const url = `${fileName}`;
       const csvFilePath = `${dir}/${fileName}`
       console.log(csvFilePath);
  // Async / await usage
          const jsonArray = await csv().fromFile(csvFilePath);
       console.log(jsonArray);
         for (const record of jsonArray) {
     
      const duplicateCheck = await sequelize.query(
           "SELECT * FROM student WHERE email =? OR phone=?",
           {
             replacements: [record.email, record.phone],
             type: QueryTypes.SELECT,
           }
         );

      if (duplicateCheck.length === 0) {
        const uniqueNum = await uuidv4();
         
           const genratedPassword = await hashPassword(record.password);
           const data = await sequelize.query(
             "INSERT INTO student(track_id,name,email,dob,gender,phone,class_id,school_id,address,fathers_name,mothers_name,parent_phone,hobby,password,created_by,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
             {
               replacements: [
             
                 uniqueNum,
                 record.name,
                 record.email,
             
                 record.dob,
                 record.gender,
                 record.phone,
                 record.class_id,
                 record.school_id,
                 record.address,
                 record.fathers_name,
                 record.mothers_name,
                 record.parent_phone,
                 record.hobby,
                 genratedPassword,
           
                 "STUDENT",
                 currentTime,
               ],
               type: QueryTypes.INSERT,
             }
           );
      } else {
        return false
      }
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
   async updateAdmissionById(files, fields, req, res) {
     try {
        console.log(fields)
        console.log(files.student_photo[0].size)
       const currentTime = getDate("YYYY-MM-DD hh:mm");
      if (files.student_photo[0].size>0) {
        
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
          "UPDATE student SET name=?,email=?,dob=?,gender=?,phone=?,class_id=?,school_id=?,address=?,fathers_name=?,mothers_name=?,parent_phone=?,hobby=?,photo=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
             
              fields.student_name[0],
              fields.student_email[0],
              fields.student_dob[0],
              fields.student_gender[0],
              fields.student_phone[0],
              fields.student_class_id[0],
              fields.school_id[0],
            
              fields.student_address[0],
              fields.student_father_name[0],
              fields.student_mother_name[0],
              fields.student_parent_phone[0],
              fields.student_hobbies[0],
             
              url,
              "STUDENT",
              currentTime,
                fields.student_id[0],
            ],
            type: QueryTypes.UPDATE,
          }
        );
      
        return true;
      
      } else {
        
     
        const data = await sequelize.query(
          "UPDATE `student` SET name=?,email=?,dob=?,gender=?,phone=?,class_id=?,school_id=?,address=?,fathers_name=?,mothers_name=?,parent_phone=?,hobby=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              fields.student_name[0],
              fields.student_email[0],
              fields.student_dob[0],
              fields.student_gender[0],
              fields.student_phone[0],
              fields.student_class_id[0],
              fields.school_id[0],
              fields.student_address[0],
              fields.student_father_name[0],
              fields.student_mother_name[0],
              fields.student_parent_phone[0],
              fields.student_hobbies[0],
              "STUDENT",
              currentTime,
               fields.student_id[0],
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
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editAdmission(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteAdmission(${data[i].id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewAdmission(${data[i].id})' data-id='${data[i].id}' > View </button> `;
       
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
   
     const data = await sequelize.query(
        `DELETE FROM student WHERE id = ${studentId}`,
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
     
     const data = await sequelize.query(
        `SELECT * FROM student WHERE id = ${studentId}`,
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
   async viewStudentById(body) {
    try {
      const studentId = parseInt(body.studentId);
     
     const data = await sequelize.query(
        `SELECT student.*,class.class_name,school.school_name FROM student INNER JOIN school ON school.id = student.school_id INNER JOIN class ON class.id = student.class_id WHERE student.id = ${studentId}`,
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
   async exportExcel(req,res) {
     try {
      console.log("#$%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(req.user);
       const id = parseInt(req.user[0].id)

       // Create a new workbook and worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('DataSheet');


      const data = await sequelize.query(
        `SELECT student.*,class.class_name,school.school_name FROM student INNER JOIN school ON school.id = student.school_id INNER JOIN class ON class.id = student.class_id WHERE student.school_id=2`,
        {
         
          type: QueryTypes.SELECT,
          
        }
        );
      // Function to write data using streams

  const stream = fs.createWriteStream('output.xlsx'); // Change the filename as needed

  // Write headers
  worksheet.addRow(['Name', 'Email', 'Phone','dob','gender','class_id','school_id','address','fathers_name','mothers_name','parent_phone','hobby']); // Replace with actual headers

  // Write data rows
       
data.forEach(item => {
  worksheet.addRow([item.name, item.email, item.phone,item.dob,item.gender,item.class_id,item.school_id,item.address,item.fathers_name,item.mothers_name,item.parent_phone,item.hobby]);
});
       const fileName = 'output.xlsx'
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

  // Pipe workbook to the stream
  await workbook.xlsx.write(stream);
 
  console.log('Data exported successfully');
      
          return res.end();

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async exportPdf(req,res) {
     try {
      console.log("#$%%%%%%%%%%%%%%%%%%%%%%%%%%");
      
        const id = parseInt(req.user[0].id)
   
     const data = await sequelize.query(
        `SELECT student.*,class.class_name,school.school_name FROM student INNER JOIN school ON school.id = student.school_id INNER JOIN class ON class.id = student.class_id WHERE student.school_id='${id}'`,
       {
          
          type: QueryTypes.SELECT,
         
        }
      );


       const browser = await puppeteer.launch();
       const page = await browser.newPage();
       page.goto(`${req.protocol}://${req.get('host')}/`)
// const htmlContent = `
//   <html>
//   <head>
//     <title>My PDF</title>
//   </head>
//   <body>
//     <h1 style="margin-left:200Px;">Hello, HTML-PDF!</h1>
//   </body>
//   </html>
// `;
//    const pdfName = 'output.xlsx'
// pdf.create(htmlContent, {}).toFile('output.pdf', (err, res) => {
//   if (err) {
//     console.error('Error generating PDF:', err);
//   } else {
//     res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', 'attachment; filename='+pdfName+';');
//     console.log('PDF generated successfully');
//   }
// });

      
          return res.end();

    
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
