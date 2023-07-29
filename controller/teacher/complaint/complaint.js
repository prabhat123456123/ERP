// const sequelize = require("../../../config/db");
const { ComplaintManagement } = require("../../../services/teacher");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const getComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().getComplaint(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data");
  } catch (error) {
    next(error);
  }
};


const saveComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().saveComplaint(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data");
  } catch (error) {
    next(error);
  }
};
const editComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().editComplaint(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data");
  } catch (error) {
    next(error);
  }
};
const updateComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().updateComplaint(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data");
  } catch (error) {
    next(error);
  }
};
const deleteComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().deleteComplaint(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data");
  } catch (error) {
    next(error);
  }
};



module.exports = {
 getComplaint,saveComplaint,editComplaint,updateComplaint,deleteComplaint,
};
