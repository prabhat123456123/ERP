// const sequelize = require("../../../config/db");
const { FacultyManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");


const viewFaculty = async (req, res, next) => {
  try {
    return res.render("admin/faculty/faculty");

  } catch (error) {
    next(error);
  }
};
const getFacultyData = async (req, res, next) => {
  try {
    const adm = await new FacultyManagement().getFaculty(req.body);
     const count = await new FacultyManagement().countFaculty(req.body);
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
const createFaculty = async (req, res, next) => {
  try {
    const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new FacultyManagement().createFaculty(
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

const updateFacultyData = async (req, res, next) => {
  try {
  
    const data = await new FacultyManagement().updateFacultyData(
      req,
      res
    );
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteFacultyData = async (req, res, next) => {
  try {
 
    const data = await new FacultyManagement().deleteFacultyData(

      req,
      res
    );
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleFacultyData = async (req, res, next) => {
  try {
  
    const data = await new FacultyManagement().deleteMultipleFacultyData(
     
      req.body,
     
    );
    return res.send(data);
  } catch (error) {
    next(error);
  }
};


const fetchFacultyById = async (req, res, next) => {
  try {
    const data = await new FacultyManagement().fetchFacultyById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewFacultyById = async (req, res, next) => {
  try {
    const data = await new FacultyManagement().viewFacultyById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};





const updateFacultyById = async (req, res, next) => {
  try {
    const data = await new FacultyManagement().updateFacultyById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};


const bulkCreateFaculty = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new FacultyManagement().bulkCreateFaculty(
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

const updateFacultyId = async (req, res, next) => {
  try {
    
    const { files, fields } = await formidableUpload(req);
    const data = await new FacultyManagement().updateFacultyId(
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
 viewFaculty,createFaculty,getFacultyData,updateFacultyData,deleteFacultyData,deleteMultipleFacultyData,updateFacultyById,fetchFacultyById,viewFacultyById,bulkCreateFaculty,updateFacultyId
 
};
