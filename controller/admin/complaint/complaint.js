// const sequelize = require("../../../config/db");
const { ComplaintManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");


const viewComplaint = async (req, res, next) => {
  try {
     const data = await new ComplaintManagement().getClass(req,res);
     return res.render("admin/complaint/complaint",{nonce: res.locals.nonce,data:data});
  } catch (error) {
    next(error);
  }
};
const getComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().getComplaint(req,res);
     const count = await new ComplaintManagement().countComplaint(req,res);
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


const deleteComplaint = async (req, res, next) => {
  try {
    const data = await new ComplaintManagement().deleteComplaint(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleComplaint = async (req, res, next) => {
  try {
    const data = await new ComplaintManagement().deleteMultipleComplaint(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchComplaintById = async (req, res, next) => {
  try {
    const data = await new ComplaintManagement().fetchComplaintById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewComplaintById = async (req, res, next) => {
  try {
    const data = await new ComplaintManagement().viewComplaintById(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};

const createComplaint = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new ComplaintManagement().createComplaint(
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



const updateComplaintById = async (req, res, next) => {
  try {
    
 
    const data = await new ComplaintManagement().updateComplaintById(
   
      req,
      res
    );
   
    req.flash("success_msg", "Complaint Updated Successfully !");
      
       return res.redirect("/complaint/view-complaint");
  
  } catch (error) {
    next(error);
  }
};

const addComplaintById = async (req, res, next) => {
  try {
   
    const data = await new ComplaintManagement().addComplaintById(
     
      req,
      res
    );
   
    req.flash("success_msg", "Complaint Updated Successfully !");
      
       return res.redirect("/complaint/view-complaint");
  
  } catch (error) {
    next(error);
  }
};


module.exports = {
 viewComplaint,getComplaint,updateComplaintById,fetchComplaintById,viewComplaintById,deleteComplaint,deleteMultipleComplaint,createComplaint,addComplaintById
 
};
