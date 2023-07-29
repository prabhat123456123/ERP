// const sequelize = require("../../../config/db");
const { ProfileManagement } = require("../../../services/teacher");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const getProfile = async (req, res, next) => {
  try {
    const adm = await new ProfileManagement().getProfile(req.body);
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
const saveProfile = async (req, res, next) => {
  try {
    const adm = await new ProfileManagement().saveProfile(req.body);
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

const editProfile = async (req, res, next) => {
  try {
    const adm = await new ProfileManagement().editProfile(req.body);
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
const updateProfile = async (req, res, next) => {
  try {
    const adm = await new ProfileManagement().updateProfile(req.body);
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
 getProfile,saveProfile,editProfile,updateProfile
};
