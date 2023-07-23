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



module.exports = {
 getComplaint
};
