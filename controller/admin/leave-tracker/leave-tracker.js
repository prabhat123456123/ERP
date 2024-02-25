

// const sequelize = require("../../../config/db");
const { LeaveTrackerManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");

const leaveStudentTracker = async (req, res, next) => {
  try {
    // const allHostel = await new LeaveTrackerManagement().addAdmission(req, res, next);
    return res.render("admin/leave-tracker/leave-student-tracker",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const leaveFacultyTracker = async (req, res, next) => {
  try {
    // const allHostel = await new LeaveTrackerManagement().addAdmission(req, res, next);
    return res.render("admin/leave-tracker/leave-faculty-tracker",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};


const getStudentLeave = async (req, res, next) => {
  try {
    const adm = await new LeaveTrackerManagement().getStudentLeave(req,res);
     const count = await new LeaveTrackerManagement().countStudentLeave(req,res);
    const data = JSON.stringify({
      draw: parseInt(req.body.draw),
      recordsFiltered: count.length,
      recordsTotal: count.length,
      data: adm.length ? adm : [],
    });
     console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const updateStudentLeave = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().updateStudentLeave(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteStudentLeave = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().deleteStudentLeave(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteStudentMultipleLeave = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().deleteStudentMultipleLeave(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchStudentLeaveById = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().fetchStudentLeaveById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewStudentLeaveById = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().viewStudentLeaveById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};


const createStudentLeave = async (req, res, next) => {
  try {
     
    const data = await new LeaveTrackerManagement().createStudentLeave(req, res);
    req.flash("success_msg","Leave Applied Successfully !");
     return res.redirect("/leave/leave-student-tracker");
  } catch (error) {
    next(error);
  }
};



const updateStudentLeaveById = async (req, res, next) => {
  try {
    
    const data = await new LeaveTrackerManagement().updateStudentLeaveById(
     
      req,
      res
    );
   
    req.flash("success_msg","Leave Updated Successfully !");
      
       return res.redirect("/leave/leave-student-tracker");
  
  } catch (error) {
    next(error);
  }
};


const getFacultyLeave = async (req, res, next) => {
  try {
    const adm = await new LeaveTrackerManagement().getFacultyLeave(req,res);
     const count = await new LeaveTrackerManagement().countFacultyLeave(req,res);
    const data = JSON.stringify({
      draw: parseInt(req.body.draw),
      recordsFiltered: count.length,
      recordsTotal: count.length,
      data: adm.length ? adm : [],
    });
     console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const updateFacultyLeave = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().updateFacultyLeave(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteFacultyLeave = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().deleteFacultyLeave(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteFacultyMultipleLeave = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().deleteFacultyMultipleLeave(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchFacultyLeaveById = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().fetchFacultyLeaveById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewFacultyLeaveById = async (req, res, next) => {
  try {
    const data = await new LeaveTrackerManagement().viewFacultyLeaveById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};


const createFacultyLeave = async (req, res, next) => {
  try {
   
    const data = await new LeaveTrackerManagement().createFacultyLeave( req, res);
   req.flash("success_msg","Leave Applied Successfully !");
      
       return res.redirect("/leave/leave-faculty-tracker");
  } catch (error) {
    next(error);
  }
};



const updateFacultyLeaveById = async (req, res, next) => {
  try {
    
    const data = await new LeaveTrackerManagement().updateFacultyLeaveById(
     
      req,
      res
    );
   
    req.flash("success_msg","Leave Updated Successfully !");
      
       return res.redirect("/leave/leave-faculty-tracker");
  
  } catch (error) {
    next(error);
  }
};




module.exports = {
  leaveStudentTracker,leaveFacultyTracker,getStudentLeave,updateStudentLeaveById,fetchStudentLeaveById,viewStudentLeaveById,updateStudentLeave,deleteStudentLeave,deleteStudentMultipleLeave,createStudentLeave,getFacultyLeave,updateFacultyLeaveById,fetchFacultyLeaveById,viewFacultyLeaveById,updateFacultyLeave,deleteFacultyLeave,deleteFacultyMultipleLeave,createFacultyLeave
 
};
