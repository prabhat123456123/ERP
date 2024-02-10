const sequelize = require("../../../config/database");
const { QueryTypes, Sequelize } = require("sequelize");
// const {
//   ErrorHandler,
//   statusCodes,
//   casbinEnforcer,
//   actionLogger,
// } = require("../../../helper");
const moment = require("moment");
const {
  copyFiles,
  getDate,
  generateRandomNumber,
  addDate,
  updateFormat
} = require("../../../utils");
// var FormData = require("form-data");
// let {uploadDocument} = require("../../utils/upload");
// const { v4: uuidv4 } = require("uuid");
// const humps = require("humps");

const path = require("path");

// const { application } = require("express");
const { FORMERR } = require("dns");
const { Console, log } = require("console");
// const { Review: ReviewFc } = require("./fc");
const axios = require("axios");
const fs = require("fs");
// const pdf = require("pdf-creator-node");

// const { SERVER_ERROR, BAD_GATEWAY } = statusCodes;

const BASEURL = process.env.BASEURL;

class LeaveTrackerManagement {
  constructor() {}

    async createStudentLeave(req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");

      
      
      const data = await sequelize.query(
        "INSERT INTO student_leave(student_id,reason,from_date,to_date,created_by,created_at) VALUES (?,?,?,?,?,?)",
        {
          replacements: [
            
            req.body.studentId,
              req.body.reason,
              req.body.from_date,
              req.body.to_date,
              
              "STUDENT",
              currentTime,
            ],
            type: QueryTypes.INSERT,
          }
          );
        
      console.log(data);
        return true;
      
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }  
   
   async updateStudentLeaveById( req, res) {
     try {
       
       const currentTime = getDate("YYYY-MM-DD hh:mm");
  console.log( req.body);
       
        const data = await sequelize.query(
          "UPDATE `student_leave` SET reason=?, from_date=?, to_date=?,updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              req.body.reason,
              req.body.from_date,
              req.body.to_date,
            
              "STUDENT",
              currentTime,
               req.body.LeaveId,
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
  
  async getStudentLeave(body) {
    try {
//  console.log(sequelize)

       const data = await sequelize.query(
        `SELECT student_leave.id,student.name,student_leave.reason,student_leave.from_date,student_leave.to_date,student_leave.leave_status FROM student_leave INNER JOIN student ON student.id = student_leave.student_id WHERE student.name like "%${
          body.search.value
        }%" OR student_leave.leave_status like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
    

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].name}`;
        data[i]["reason"] = `${data[i].reason}`;
        data[i]["from_date"] = updateFormat(
                  moment(data[i].from_date),
                  "YYYY-MM-DD"
                );
        data[i]["to_date"] =  updateFormat(
                  moment(data[i].to_date),
                  "YYYY-MM-DD"
                );
        data[i]["leave_status"] = `${data[i].leave_status}`;

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editLeaveTracker(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteLeaveTracker(${data[i].id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewLeaveTracker(${data[i].id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countStudentLeave(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM student_leave`,
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
   async updateStudentLeave(body) {
    try {

      let id = parseInt(body.pk)

      if (body.name === "reason") {
         const data = await sequelize.query(
        `UPDATE student_leave SET reason=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
        );
          return data;
      }
       if (body.name == "from_date") {
         const data = await sequelize.query(
        `UPDATE student_leave SET from_date=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
       if (body.name == "to_date") {
         const data = await sequelize.query(
        `UPDATE student_leave SET to_date=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
       if (body.name == "leave_status") {
         const data = await sequelize.query(
        `UPDATE student_leave SET leave_status=? WHERE id = ${id}`,
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

    async deleteStudentLeave(body) {
    try {

      const leaveId = parseInt(body.leaveId);
     const data = await sequelize.query(
        `DELETE FROM student_leave WHERE id = ${leaveId}`,
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
  async fetchStudentLeaveById(body) {
    try {
      const leaveId = parseInt(body.leaveId);
   
     const leaveData = await sequelize.query(
        `SELECT * FROM student_leave WHERE id = ${leaveId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );

      const data = []

      const leave = {
        reason:leaveData[0].reason,
        from_date: updateFormat(
                  moment(leaveData[0].from_date),
                  "YYYY-MM-DD"
        ),
        to_date: updateFormat(
                  moment(leaveData[0].to_date),
                  "YYYY-MM-DD"
        ),
      }
   data.push(leave)
      return data;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async viewStudentLeaveById(body) {
    try {
      const leaveId = parseInt(body.leaveId);
    
     const leaveData = await sequelize.query(
        `SELECT student.name,student.gender,class.class_name,school.school_name,student_leave.reason,student_leave.from_date,student_leave.to_date,student_leave.leave_status FROM student_leave INNER JOIN student ON student.id = student_leave.student_id INNER JOIN class ON class.id = student.class_id INNER JOIN school ON school.id = student.school_id WHERE student_leave.id = ${leaveId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );

       const data = []

      const leave = {
        name:leaveData[0].name,
        gender:leaveData[0].gender,
        class_name:leaveData[0].class_name,
        school_name:leaveData[0].school_name,
        reason:leaveData[0].reason,
        leave_status:leaveData[0].leave_status,
         from_date: updateFormat(
                  moment(leaveData[0].from_date),
                  "YYYY-MM-DD"
        ),
        to_date: updateFormat(
                  moment(leaveData[0].to_date),
                  "YYYY-MM-DD"
        ),
      }
   data.push(leave)
      
          return data;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 
  
    async deleteStudentMultipleLeave(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM student_leave WHERE id = (${ids[index]})`,
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




  async createFacultyLeave(req, res) {
    try {
      const currentTime = getDate("YYYY-MM-DD hh:mm");
console.log(req.body);
        const data = await sequelize.query(
          "INSERT INTO faculty_leave(faculty_id,reason,from_date,to_date,created_by,created_at) VALUES (?,?,?,?,?,?)",
          {
            replacements: [
             
             req.body.facultyId,
              req.body.reason,
              req.body.from_date,
              req.body.to_date,
              
              "Faculty",
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
   
   async updateFacultyLeaveById( req, res) {
     try {
       
       const currentTime = getDate("YYYY-MM-DD hh:mm");
  
       
        const data = await sequelize.query(
          "UPDATE `faculty_leave` SET reason=?,from_date=?,to_date=?, updated_by=?,updated_at=? WHERE id = ?",
          {
            replacements: [
              req.body.reason,
              req.body.from_date,
              req.body.to_date,
            
              "Faculty",
              currentTime,
               req.body.leaveId,
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
  
  async getFacultyLeave(body) {
    try {
//  console.log(sequelize)

       const data = await sequelize.query(
        `SELECT faculty_leave.id,faculty.name,faculty_leave.reason,faculty_leave.from_date,faculty_leave.to_date,faculty_leave.leave_status FROM faculty_leave INNER JOIN faculty ON faculty.id = faculty_leave.faculty_id WHERE faculty.name like "%${
          body.search.value
        }%" OR faculty_leave.leave_status like "%${body.search.value}%" LIMIT ${parseInt(
          body.length
        )} OFFSET ${parseInt(body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].id}' class='delete_check'>`;
        data[i]["name"] = `${data[i].name}`;
        data[i]["reason"] = `${data[i].reason}`;
         data[i]["from_date"] = updateFormat(
                  moment(data[i].from_date),
                  "YYYY-MM-DD"
                );
        data[i]["to_date"] =  updateFormat(
                  moment(data[i].to_date),
                  "YYYY-MM-DD"
                );
        data[i]["leave_status"] = `${data[i].leave_status}`;

        data[i][
          "action"
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editLeaveTracker(${data[i].id})' data-id='${data[i].id}' > Edit </button> <button class='btn btn-danger btn-sm' onclick='deleteLeaveTracker(${data[i].id})' data-id='${data[i].id}' > Delete </button> <button class='btn btn-success btn-sm' onclick='viewLeaveTracker(${data[i].id})' data-id='${data[i].id}' > View </button> `;
       
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
    async countFacultyLeave(body) {
    try {
//  console.log(sequelize)
     
       const data = await sequelize.query(
        `SELECT * FROM faculty_leave`,
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
   async updateFacultyLeave(body) {
    try {

      let id = parseInt(body.pk)

      if (body.name === "reason") {
         const data = await sequelize.query(
        `UPDATE faculty_leave SET reason=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
        );
          return data;
      }
       if (body.name == "from_date") {
         const data = await sequelize.query(
        `UPDATE faculty_leave SET from_date=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
       if (body.name == "to_date") {
         const data = await sequelize.query(
        `UPDATE faculty_leave SET to_date=? WHERE id = ${id}`,
        {
          type: QueryTypes.UPDATE,
           replacements: [
            body.value,
           

          ],
        }
         );
           return data;
      }
       if (body.name == "leave_status") {
         const data = await sequelize.query(
        `UPDATE faculty_leave SET leave_status=? WHERE id = ${id}`,
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

    async deleteFacultyLeave(body) {
    try {

      const leaveId = parseInt(body.leaveId);
     const data = await sequelize.query(
        `DELETE FROM faculty_leave WHERE id = ${leaveId}`,
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
  async fetchFacultyLeaveById(body) {
    try {
      const leaveId = parseInt(body.leaveId);
   
     const leaveData = await sequelize.query(
        `SELECT * FROM faculty_leave WHERE id = ${leaveId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );
        const data = []

      const leave = {
        reason:leaveData[0].reason,
        from_date: updateFormat(
                  moment(leaveData[0].from_date),
                  "YYYY-MM-DD"
        ),
        to_date: updateFormat(
                  moment(leaveData[0].to_date),
                  "YYYY-MM-DD"
        ),
      }
   data.push(leave)
          return data;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
   async viewFacultyLeaveById(body) {
    try {
      const leaveId = parseInt(body.leaveId);
    
     const leaveData = await sequelize.query(
        `SELECT faculty.name,faculty.gender,school.school_name,faculty_leave.reason,faculty_leave.leave_status FROM faculty_leave INNER JOIN faculty ON faculty.id = faculty_leave.faculty_id INNER JOIN school ON school.id = faculty.school_id WHERE faculty_leave.id = ${leaveId}`,
        {
          type: QueryTypes.SELECT,
         
        }
      );
        const data = []

      const leave = {
        name:leaveData[0].name,
        gender:leaveData[0].gender,
       leave_status:leaveData[0].leave_status,
        school_name:leaveData[0].school_name,
        reason:leaveData[0].reason,
         from_date: updateFormat(
                  moment(leaveData[0].from_date),
                  "YYYY-MM-DD"
        ),
        to_date: updateFormat(
                  moment(leaveData[0].to_date),
                  "YYYY-MM-DD"
        ),
      }
   data.push(leave)
          return data;

    
    } catch (error) {
      if (error.statusCode) {
        console.log("hello");
        throw new ErrorHandler(error.statusCode, error.message);
      }
      throw new ErrorHandler(SERVER_ERROR, error);
    }
  }
 
  
    async deleteFacultyMultipleLeave(body) {
    try {

      let ids = body.deleteids_arr;
      for (let index = 0; index < ids.length; index++) {
     
     const data = await sequelize.query(
        `DELETE FROM faculty_leave WHERE id = (${ids[index]})`,
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
  LeaveTrackerManagement,
};
