// const sequelize = require("../../../config/db");
const { ComplaintManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");


const viewComplaint = async (req, res, next) => {
  try {
     return res.render("admin/complaint/complaint");
  } catch (error) {
    next(error);
  }
};
const getComplaint = async (req, res, next) => {
  try {
    const adm = await new ComplaintManagement().getComplaint(req.body);
     const count = await new ComplaintManagement().countComplaint(req.body);
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



module.exports = {
 viewComplaint,getComplaint
 
};
