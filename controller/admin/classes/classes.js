// const sequelize = require("../../../config/db");
const { ClassesManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");

const addClasses = async (req, res, next) => {
  try {
    // const data = await new ClassesManagement().getClass(req, res);
    return res.render("admin/classes/classes");
  } catch (error) {
    next(error);
  }
};
const getClasses = async (req, res, next) => {
  try {
    const adm = await new ClassesManagement().getClasses(req.body);
     const count = await new ClassesManagement().countClasses(req.body);
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

const updateClasses = async (req, res, next) => {
  try {
    const data = await new ClassesManagement().updateClasses(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteClasses = async (req, res, next) => {
  try {
    const data = await new ClassesManagement().deleteClasses(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleClasses = async (req, res, next) => {
  try {
    const data = await new ClassesManagement().deleteMultipleClasses(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchClassesById = async (req, res, next) => {
  try {
    const data = await new ClassesManagement().fetchClassesById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewClassesById = async (req, res, next) => {
  try {
    const data = await new ClassesManagement().viewClassesById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};



const updateClassesById = async (req, res, next) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.body);
    const data = await new ClassesManagement().updateClassesById(req.body);
   req.flash("success_msg", "Class Updated Successfully !");
      
       return res.redirect("/classes/classes");
  } catch (error) {
    next(error);
  }
};
const createClasses = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new ClassesManagement().createClasses(
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
    const data = await new ClassesManagement().updateAdmissionById(
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
 addClasses,getClasses,updateClassesById,fetchClassesById,viewClassesById,updateClasses,deleteClasses,deleteMultipleClasses,createClasses
 
};
