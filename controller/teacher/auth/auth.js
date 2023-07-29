// const sequelize = require("../../../config/db");
const { AuthManagement } = require("../../../services/teacher");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const register = async (req, res, next) => {
  try {
    const adm = await new AuthManagement().register(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data55555");
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const adm = await new AuthManagement().login(req.body);
    //  const count = await new AuthManagement().countStudent(req.body);
    // const data = JSON.stringify({
    //   draw: parseInt(req.body.draw),
    //   recordsFiltered: count.length,
    //   recordsTotal: count.length,
    //   data: adm.length ? adm : [],
    // });
    //  console.log(data)
    return res.send("data55555");
  } catch (error) {
    next(error);
  }
};



module.exports = {
 register,login
};
