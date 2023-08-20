// const sequelize = require("../../../config/db");
const { ExamManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");


const viewExam = async (req, res, next) => {
  try {
     const data = await new ExamManagement().getClass(req, res);
     return res.render("admin/exam/exam",{data:data});

  } catch (error) {
    next(error);
  }
};

const getExam = async (req, res, next) => {
  try {
    const adm = await new ExamManagement().getExam(req.body);
     const count = await new ExamManagement().countExam(req.body);
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
const updateExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().updateExam(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteExam(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteMultipleExam(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchExamById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().fetchExamById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewExamById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().viewExamById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};


const updateExamById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().updateExamById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const createExam = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new ExamManagement().createExam(
      files,
      fields,
      req,
      res
    );
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const updateExamId = async (req, res, next) => {
  try {
    
    const { files, fields } = await formidableUpload(req);
    const data = await new ExamManagement().updateExamId(
      files,
      fields,
      req,
      res
    );
   
    req.flash("success_msg", "Student Records Updated Successfully !");
      
       return res.redirect("/admission/admission");
  
  } catch (error) {
    next(error);
  }
};



module.exports = {
  viewExam,getExam,updateExamById,fetchExamById,viewExamById,updateExamId,updateExam,deleteExam,deleteMultipleExam,createExam
};
