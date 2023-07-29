// const sequelize = require("../../../config/db");
const { FeedbackManagement } = require("../../../services/student");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const getFeedback = async (req, res, next) => {
  try {
    const adm = await new FeedbackManagement().getFeedback(req.body);
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
const saveFeedback = async (req, res, next) => {
  try {
    const adm = await new FeedbackManagement().saveFeedback(req.body);
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
const editFeedback = async (req, res, next) => {
  try {
    const adm = await new FeedbackManagement().editFeedback(req.body);
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
const updateFeedback = async (req, res, next) => {
  try {
    const adm = await new FeedbackManagement().updateFeedback(req.body);
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
const deleteFeedback = async (req, res, next) => {
  try {
    const adm = await new FeedbackManagement().deleteFeedback(req.body);
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
 saveFeedback,getFeedback,editFeedback,updateFeedback,deleteFeedback
};
