// const sequelize = require("../../../config/db");
const { QuizManagement } = require("../../../services/student");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");



const getQuiz = async (req, res, next) => {
  try {
    const adm = await new QuizManagement().getQuiz(req.body);
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

const singleQuiz = async (req, res, next) => {
  try {
    const adm = await new QuizManagement().singleQuiz(req.body);
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
 getQuiz,singleQuiz
};
