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
const { v4: uuidv4 } = require("uuid");
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
        "INSERT INTO student_leave(track_student_id,reason,from_date,to_date,created_by,created_at) VALUES (?,?,?,?,?,?)",
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
          "UPDATE `student_leave` SET reason=?, from_date=?, to_date=?,updated_by=?,updated_at=? WHERE track_id = ?",
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
  
  async getStudentLeave(req, res) {
    try {
//  console.log(sequelize)
    const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `student.track_id = '${req.user[0].track_id}' AND `
      }
       const data = await sequelize.query(
        `SELECT student_leave.track_id,student.name,student_leave.reason,student_leave.from_date,student_leave.to_date,student_leave.leave_status FROM student_leave INNER JOIN student ON student.track_id = student_leave.track_student_id WHERE student.track_school_id = '${id}' AND ` + whereClause + `(student.name like "%${
          req.body.search.value
        }%" OR student_leave.leave_status like "%${req.body.search.value}%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
    

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].track_id}' class='delete_check'>`;
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
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editLeaveTracker(${data[i].track_id})' data-id='${data[i].track_id}' > Edit </button> <button class='btn btn-danger btn-sm deleteBtn' onclick='deleteLeaveTracker(${data[i].track_id})' data-id='${data[i].track_id}' > Delete </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewLeaveTracker(${data[i].track_id})' data-id='${data[i].track_id}' > View </button> `;
       
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
    async countStudentLeave(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "student") {
        whereClause = `AND student.track_id = '${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT student_leave.track_id,student.name,student_leave.reason,student_leave.from_date,student_leave.to_date,student_leave.leave_status FROM student_leave INNER JOIN student ON student.track_id = student_leave.track_student_id WHERE student.track_school_id = '${id}'` + whereClause,
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

      let id = body.pk;

      if (body.name === "reason") {
         const data = await sequelize.query(
        `UPDATE student_leave SET reason=? WHERE track_id = '${id}'`,
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
        `UPDATE student_leave SET from_date=? WHERE track_id = '${id}'`,
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
        `UPDATE student_leave SET to_date=? WHERE track_id = '${id}'`,
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
        `UPDATE student_leave SET leave_status=? WHERE track_id = '${id}'`,
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

      const leaveId = body.leaveId;
     const data = await sequelize.query(
        `DELETE FROM student_leave WHERE track_id = '${leaveId}'`,
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
      const leaveId = body.leaveId;
   
     const leaveData = await sequelize.query(
        `SELECT * FROM student_leave WHERE track_id = '${leaveId}'`,
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
      const leaveId = body.leaveId;
    
     const leaveData = await sequelize.query(
        `SELECT student.name,student.gender,class.class_name,school.school_name,student_leave.reason,student_leave.from_date,student_leave.to_date,student_leave.leave_status FROM student_leave INNER JOIN student ON student.track_id = student_leave.track_student_id INNER JOIN class ON class.track_id = student.track_class_id INNER JOIN school ON school.track_id = student.track_school_id WHERE student_leave.track_id = '${leaveId}'`,
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
        `DELETE FROM student_leave WHERE track_id = (${ids[index]})`,
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
          "INSERT INTO faculty_leave(track_faculty_id,reason,from_date,to_date,created_by,created_at) VALUES (?,?,?,?,?,?)",
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
          "UPDATE `faculty_leave` SET reason=?,from_date=?,to_date=?, updated_by=?,updated_at=? WHERE track_id = ?",
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
  
  async getFacultyLeave(req,res) {
    try {
//  console.log(sequelize)
       const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `faculty.track_id = '${req.user[0].track_id}' AND `
      }

       const data = await sequelize.query(
        `SELECT faculty_leave.track_id,faculty.name,faculty_leave.reason,faculty_leave.from_date,faculty_leave.to_date,faculty_leave.leave_status FROM faculty_leave INNER JOIN faculty ON faculty.track_id = faculty_leave.track_faculty_id WHERE track_school_id ='${id}'AND ` + whereClause + `(faculty.name like "%${
          req.body.search.value
        }%" OR faculty_leave.leave_status like "%${req.body.search.value}%") LIMIT ${parseInt(
          req.body.length
        )} OFFSET ${parseInt(req.body.start)}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      

      for (let i = 0; i < data.length; i++) {
        data[i]["check"] = `<input type='checkbox' data-id='${data[i].track_id}' class='delete_check'>`;
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
        ] = `<button class='btn btn-primary btn-sm editBtn' onclick='editLeaveTracker(${data[i].track_id})' data-id='${data[i].track_id}' > Edit </button> <button class='btn btn-danger btn-sm deleteBtn' onclick='deleteLeaveTracker(${data[i].track_id})' data-id='${data[i].track_id}' > Delete </button> <button class='btn btn-success btn-sm viewBtn' onclick='viewLeaveTracker(${data[i].track_id})' data-id='${data[i].track_id}' > View </button> `;
       
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
    async countFacultyLeave(req,res) {
    try {
//  console.log(sequelize)
      const id = req.user[0].role=="school"? req.user[0].track_id : req.user[0].track_school_id
      let whereClause = "";
      if (req.user[0].role == "faculty") {
        whereClause = `AND faculty.track_id = '${req.user[0].track_id}'`
      }
       const data = await sequelize.query(
        `SELECT faculty_leave.track_id,faculty.name,faculty_leave.reason,faculty_leave.from_date,faculty_leave.to_date,faculty_leave.leave_status FROM faculty_leave INNER JOIN faculty ON faculty.track_id = faculty_leave.track_faculty_id WHERE faculty.track_school_id = '${id}' ` + whereClause,
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

      let id = body.pk;

      if (body.name === "reason") {
         const data = await sequelize.query(
        `UPDATE faculty_leave SET reason=? WHERE track_id = '${id}'`,
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
        `UPDATE faculty_leave SET from_date=? WHERE track_id = '${id}'`,
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
        `UPDATE faculty_leave SET to_date=? WHERE track_id = '${id}'`,
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
        `UPDATE faculty_leave SET leave_status=? WHERE track_id = '${id}'`,
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

      const leaveId = body.leaveId;
     const data = await sequelize.query(
        `DELETE FROM faculty_leave WHERE track_id = '${leaveId}'`,
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
      const leaveId = body.leaveId;
   
     const leaveData = await sequelize.query(
        `SELECT * FROM faculty_leave WHERE track_id = '${leaveId}'`,
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
      const leaveId = body.leaveId;
    
     const leaveData = await sequelize.query(
        `SELECT faculty.name,faculty.gender,school.school_name,faculty_leave.reason,faculty_leave.leave_status FROM faculty_leave INNER JOIN faculty ON faculty.track_id = faculty_leave.track_faculty_id INNER JOIN school ON school.track_id = faculty.track_school_id WHERE faculty_leave.track_id = '${leaveId}'`,
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
        `DELETE FROM faculty_leave WHERE track_id = (${ids[index]})`,
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
