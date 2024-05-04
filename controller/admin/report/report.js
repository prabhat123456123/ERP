// const sequelize = require("../../../config/db");
const { ReportManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils/upload");


const reportStudent = async (req, res, next) => {
  try {
      const data = await new ReportManagement().getClass(req);
   return res.render("admin/report/report-student",{nonce: res.locals.nonce,data:data});
  } catch (error) {
    next(error);
  }
};

const reportFaculty = async (req, res, next) => {
  try {
   return res.render("admin/report/report-faculty",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const fetchStudentByClass = async (req, res, next) => {
  try {
    const data = await new ReportManagement().fetchStudentByClass(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};
const certificateRender = async (req, res, next) => {
  try {
      const data = await new ReportManagement().getClass(req,res);
   return res.render("admin/report/certificate",{nonce: res.locals.nonce,data:data});
  } catch (error) {
    next(error);
  }
};
const fetchStudentReportByClass = async (req, res, next) => {
  try {
    const data = await new ReportManagement().fetchStudentReportByClass(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const getCertificate = async (req, res, next) => {
  try {
    
   
    const adm = await new ReportManagement().getCertificate(req,res);
     const count = await new ReportManagement().countCertificate(req,res);
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


const deleteCertificate = async (req, res, next) => {
  try {
    const data = await new ReportManagement().deleteCertificate(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleCertificate = async (req, res, next) => {
  try {
    const data = await new ReportManagement().deleteMultipleCertificate(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchCertificateById = async (req, res, next) => {
  try {
    const data = await new ReportManagement().fetchCertificateById(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};
const getClass = async (req, res, next) => {
  try {
    const data = await new ReportManagement().getClass(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};
const assignCertificate = async (req, res, next) => {
  try {
    const data = await new ReportManagement().assignCertificate(req,res);
   
     console.log(">>>>>>>>>>>>>>>>>>>>>",data)
      return res.send(data);
    
  } catch (error) {
    next(error);
  }

};

const viewCertificateById = async (req, res, next) => {
  try {
    const data = await new ReportManagement().viewCertificateById(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};






const createCertificate = async (req, res, next) => {
  try {

     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new ReportManagement().createCertificate(
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

const updateCertificateById = async (req, res, next) => {
  try {
    const { files, fields } = await formidableUpload(req);
    const data = await new ReportManagement().updateCertificateById(
      files,
      fields,
      req,
      res
    );
   
    req.flash("success_msg", "Certificate Updated Successfully !");
      
       return res.redirect("/report/certificate-render");
  
  } catch (error) {
    next(error);
  }
};

module.exports = {
 reportStudent,reportFaculty,fetchStudentByClass,fetchStudentReportByClass,getCertificate,updateCertificateById,fetchCertificateById,viewCertificateById,deleteCertificate,deleteMultipleCertificate,createCertificate,certificateRender,getClass,assignCertificate
 
};
