// const sequelize = require("../../../config/db");
const { AdmissionManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");

const addAdmission = async (req, res, next) => {
  try {
    // const allHostel = await new AdmissionManagement().addAdmission(req, res, next);
    return res.render("admin/admission/admission");
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




module.exports = {
  addAdmission,getAdmission,updateAdmission,deleteAdmission,deleteMultiple
 
};
