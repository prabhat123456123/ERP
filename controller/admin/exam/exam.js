// const sequelize = require("../../../config/db");
const { ExamManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");


const viewExam = async (req, res, next) => {
  try {
     const data = await new ExamManagement().getClass(req, res);
     const subject = await new ExamManagement().getSubject(req, res);
     return res.render("admin/exam/exam",{nonce: res.locals.nonce,data:data,subject:subject});

  } catch (error) {
    next(error);
  }
};

const examWiseQuestion = async (req, res, next) => {
  try {
    
    
     return res.render("admin/exam/question",{nonce: res.locals.nonce,examId:req.params.id});

  } catch (error) {
    next(error);
  }
};

const getExam = async (req, res, next) => {
  try {
    const adm = await new ExamManagement().getExam(req,res);
     const count = await new ExamManagement().countExam(req,res);
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
const updateExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().updateExam(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteExam(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteMultipleExam(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchExamById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().fetchExamById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewExamById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().viewExamById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};



const createExam = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new ExamManagement().createExam(
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

const updateExamById = async (req, res, next) => {
  try {
    
    const data = await new ExamManagement().updateExamById(
      
      req,
      res
    );
   
    req.flash("success_msg", "Student Records Updated Successfully !");
      
       return res.redirect("/exam/view-exam");
  
  } catch (error) {
    next(error);
  }
};


const getQuestion = async (req, res, next) => {
  try {
    const adm = await new ExamManagement().getQuestion(req,res);
     const count = await new ExamManagement().countQuestion(req,res);
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
const updateQuestion = async (req, res, next) => {
  try {
    const data = await new ExamManagement().updateQuestion(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteQuestion = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteQuestion(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleQuestion = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteMultipleQuestion(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchQuestionById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().fetchQuestionById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewQuestionById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().viewQuestionById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};



const createQuestion = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
   
    const data = await new ExamManagement().createQuestion(
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

const updateQuestionById = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    const data = await new ExamManagement().updateQuestionById(
      files, fields,
      req,
      res
    );
   
    req.flash("success_msg", "Question Updated Successfully !");
      
       return res.redirect(`/exam/examWiseQuestion/${fields.examId[0]}`);
  
  } catch (error) {
    next(error);
  }
};

const subjectMarks = async (req, res, next) => {
  try {
    const data = await new ExamManagement().getData(req, res);
    return res.render("admin/exam/subjective-marks",{nonce: res.locals.nonce,data:data});
  } catch (error) {
    next(error);
  }
};
const getSubjectMarks = async (req, res, next) => {
  try {
    const adm = await new ExamManagement().getSubjectMarks(req,res);
     const count = await new ExamManagement().countSubjectMarks(req,res);
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

const updateSubjectMarks = async (req, res, next) => {
  try {
    const data = await new ExamManagement().updateSubjectMarks(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteSubjectMarks = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteSubjectMarks(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const assignExam = async (req, res, next) => {
  try {
    const data = await new ExamManagement().assignExam(req,res);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};
const deleteMultipleSubjectMarks = async (req, res, next) => {
  try {
    const data = await new ExamManagement().deleteMultipleSubjectMarks(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchSubjectMarksById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().fetchSubjectMarksById(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const fetchStudentAndSubjectByClass = async (req, res, next) => {
  try {
    const data = await new ExamManagement().fetchStudentAndSubjectByClass(req);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewSubjectMarksById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().viewSubjectMarksById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};



const updateSubjectMarksById = async (req, res, next) => {
  try {
    const data = await new ExamManagement().updateSubjectMarksById(req,res);
   
    req.flash("success_msg", "Subject Updated Successfully !");
      
       return res.redirect(`/exam/subject-marks`);
  } catch (error) {
    next(error);
  }
};
const createSubjectMarks = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(files)
    const data = await new ExamManagement().createSubjectMarks(
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






module.exports = {
  viewExam,getExam,updateExamById,fetchExamById,viewExamById,updateExam,deleteExam,deleteMultipleExam,createExam,examWiseQuestion,getQuestion,updateQuestionById,fetchQuestionById,viewQuestionById,updateQuestion,deleteQuestion,deleteMultipleQuestion,createQuestion,subjectMarks,getSubjectMarks,updateSubjectMarksById,fetchSubjectMarksById,viewSubjectMarksById,updateSubjectMarks,deleteSubjectMarks,deleteMultipleSubjectMarks,createSubjectMarks,fetchStudentAndSubjectByClass,assignExam
};
