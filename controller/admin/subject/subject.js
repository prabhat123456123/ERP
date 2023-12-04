// const sequelize = require("../../../config/db");
const { SubjectManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");

const addSubject = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().getClass(req, res);
    return res.render("admin/subject/subject",{data:data});
  } catch (error) {
    next(error);
  }
};
const getSubject = async (req, res, next) => {
  try {
    const adm = await new SubjectManagement().getSubject(req.body);
     const count = await new SubjectManagement().countSubject(req.body);
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

const updateSubject = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().updateSubject(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteSubject = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().deleteSubject(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleSubject = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().deleteMultipleSubject(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchSubjectById = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().fetchSubjectById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewSubjectById = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().viewSubjectById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};



const updateSubjectById = async (req, res, next) => {
  try {
    const data = await new SubjectManagement().updateSubjectById(req.body);
   
    req.flash("success_msg", "Subject Updated Successfully !");
      
       return res.redirect(`/subject/subject/${req.body.classesId}`);
  } catch (error) {
    next(error);
  }
};
const createSubject = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new SubjectManagement().createSubject(
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
    const data = await new SubjectManagement().updateAdmissionById(
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
  addSubject,getSubject,updateSubjectById,fetchSubjectById,viewSubjectById,updateSubject,deleteSubject,deleteMultipleSubject,createSubject
 
};
