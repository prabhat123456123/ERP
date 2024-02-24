// const sequelize = require("../../../config/db");
const { FinancialManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const addStudentFinancial = async (req, res, next) => {
  try {
      const data = await new FinancialManagement().getClass(req, res);
     return res.render("admin/financial/financial-student",{data:data});

  } catch (error) {
    next(error);
  }
};
const getStudentFinancial = async (req, res, next) => {
  try {

        const adm = await new FinancialManagement().getStudentFinancial(req,res);
     const count = await new FinancialManagement().countStudent(req,res);
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
const addFacultyFinancial = async (req, res, next) => {
  try {
      const data = await new FinancialManagement().getClass(req, res);
     return res.render("admin/financial/financial-student",{data:data});

  } catch (error) {
    next(error);
  }
};
const getFacultyFinancial = async (req, res, next) => {
  try {
        const adm = await new FinancialManagement().getFacultyFinancial(req,res);
     const count = await new FinancialManagement().countFaculty(req,res);
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
const viewStudentFeeDetails = async (req, res, next) => {
  try {
      const data = await new FinancialManagement().getFeeDetails(req, res);

     return res.render("admin/financial/view-student-fee-details",{data:data});

  } catch (error) {
    next(error);
  }
};
const viewFacultyFeeDetails = async (req, res, next) => {
  try {
        return res.render("admin/financial/view-faculty-fee-details");

  } catch (error) {
    next(error);
  }
};




module.exports = {
addStudentFinancial,getStudentFinancial,addFacultyFinancial,getFacultyFinancial,viewStudentFeeDetails,viewFacultyFeeDetails
 
};
