// const sequelize = require("../../../config/db");
const { TestManagement } = require("../../../services/admin");
// const moment = require("moment");
// const {
//   serviceSingleDocUploadUtil,
//   formidableUpload,
// } = require("../../../utils/upload");

const onlineTest = async (req, res, next) => {
  try {
   
    return res.render("admin/test-series/online-test",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};
const FullLengthTest = async (req, res, next) => {
  try {
    return res.render("admin/test-series/full-length-test",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const QuizTest = async (req, res, next) => {
  try {
    return res.render("admin/test-series/quiz-test",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const PracticeTest = async (req, res, next) => {
  try {
    return res.render("admin/test-series/practice-test",{nonce: res.locals.nonce});
  } catch (error) {
    next(error);
  }
};

const getCompletedQuizTest = async (req, res, next) => {
  try {
    const adm = await new TestManagement().getCompletedQuizTest(req,res);
     const count = await new TestManagement().countCompletedQuizTest(req,res);
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

const getNewQuizTest = async (req, res, next) => {
  try {
    const adm = await new TestManagement().getNewQuizTest(req,res);
     const count = await new TestManagement().countNewQuizTest(req,res);
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

const getNewPracticeTest = async (req, res, next) => {
  try {
    const adm = await new TestManagement().getNewPracticeTest(req,res);
     const count = await new TestManagement().countNewPracticeTest(req,res);
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

const getCompletedPracticeTest = async (req, res, next) => {
  try {
    const adm = await new TestManagement().getCompletedPracticeTest(req,res);
     const count = await new TestManagement().countCompletedPracticeTest(req,res);
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

const getCompletedFulllengthTest = async (req, res, next) => {
  try {
    const adm = await new TestManagement().getCompletedFulllengthTest(req,res);
     const count = await new TestManagement().countCompletedFulllengthTest(req,res);
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

const getNewFulllengthTest = async (req, res, next) => {
  try {
    const adm = await new TestManagement().getNewFulllengthTest(req,res);
     const count = await new TestManagement().countNewFulllengthTest(req,res);
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

const getQuestionExamWise = async (req, res, next) => {
  try {
    const data = await new TestManagement().getQuestionExamWise(req.body);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const viewExplaination = async (req, res, next) => {
  try {
    const data = await new TestManagement().viewExplaination(req.body);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getFullLengthQuestion = async (req, res, next) => {
  try {
    const data = await new TestManagement().getFullLengthQuestion(req.body);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getQuestionByIndex = async (req, res, next) => {
  try {
    const data = await new TestManagement().getQuestionByIndex(req,res);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const saveNextQuestion = async (req, res, next) => {
  try {
    const data = await new TestManagement().saveNextQuestion(req,res);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const getAnsweredNotAnswered = async (req, res, next) => {
  try {
    const data = await new TestManagement().getAnsweredNotAnswered(req,res);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const getPracticeQuestion = async (req, res, next) => {
  try {
    const data = await new TestManagement().getPracticeQuestion(req.body);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};


const getQuizQuestion = async (req, res, next) => {
  try {
    const data = await new TestManagement().getQuizQuestion(req.body);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};






const submitExam = async (req, res, next) => {
  try {
    const data = await new TestManagement().submitExam(req,res);
    
    return res.send(data);
  } catch (error) {
    next(error);
  }
};






module.exports = {
 onlineTest,FullLengthTest,QuizTest,PracticeTest,getNewFulllengthTest,getCompletedFulllengthTest,getCompletedPracticeTest,getNewPracticeTest,getNewQuizTest,getCompletedQuizTest,viewExplaination,getQuestionExamWise,getFullLengthQuestion,getPracticeQuestion,getQuestionByIndex,getQuizQuestion,submitExam,saveNextQuestion,getAnsweredNotAnswered
 
};
