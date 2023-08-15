// const sequelize = require("../../../config/db");
const { AdmissionManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");

const addAdmission = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().getClass(req, res);
    return res.render("admin/admission/admission",{data:data});
  } catch (error) {
    next(error);
  }
};
const getAdmission = async (req, res, next) => {
  try {
    const adm = await new AdmissionManagement().getAdmission(req.body);
     const count = await new AdmissionManagement().countStudent(req.body);
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
const updateAdmission = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().updateAdmission(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteAdmission = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().deleteAdmission(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultiple = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().deleteMultiple(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchStudentById = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().fetchStudentById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewStudentById = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().viewStudentById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};

const exportExcel = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().exportExcel(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};

const exportPdf = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().exportPdf(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};

const updateStudentById = async (req, res, next) => {
  try {
    const data = await new AdmissionManagement().updateStudentById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const createStudent = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new AdmissionManagement().createStudent(
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

const bulkCreateStudent = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new AdmissionManagement().bulkCreateStudent(
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

const updateAdmissionById = async (req, res, next) => {
  try {
    
    const { files, fields } = await formidableUpload(req);
    const data = await new AdmissionManagement().updateAdmissionById(
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
  addAdmission,updateAdmissionById,getAdmission,updateAdmission,deleteAdmission,deleteMultiple,fetchStudentById,updateStudentById,createStudent,viewStudentById,bulkCreateStudent,exportExcel,exportPdf
 
};
