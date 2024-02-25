// const sequelize = require("../../../config/db");
const { FeedbackManagement } = require("../../../services/admin");
// const moment = require("moment");
const {
  serviceSingleDocUploadUtil,
  formidableUpload,
} = require("../../../utils");


const viewFeedback = async (req, res, next) => {
  try {
   return res.render("admin/feedback/feedback",{nonce: res.locals.nonce});

  } catch (error) {
    next(error);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const adm = await new FeedbackManagement().getFeedback(req,res);
     const count = await new FeedbackManagement().countFeedback(req,res);
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



const deleteFeedback = async (req, res, next) => {
  try {
    const data = await new FeedbackManagement().deleteFeedback(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
const deleteMultipleFeedback = async (req, res, next) => {
  try {
    const data = await new FeedbackManagement().deleteMultipleFeedback(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

const fetchFeedbackById = async (req, res, next) => {
  try {
    const data = await new FeedbackManagement().fetchFeedbackById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }

};

const viewFeedbackById = async (req, res, next) => {
  try {
    const data = await new FeedbackManagement().viewFeedbackById(req.body);
   
    //  console.log(data)
    return res.send(data);
  } catch (error) {
    next(error);
  }
  
};

const createFeedback = async (req, res, next) => {
  try {
     const { files, fields } = await formidableUpload(req);
    // console.log(fields)
    // console.log(files)
    const data = await new FeedbackManagement().createFeedback(
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



const updateFeedbackById = async (req, res, next) => {
  try {
    
 
    const data = await new FeedbackManagement().updateFeedbackById(
    
      req,
      res
    );
   
    req.flash("success_msg", "Feedback Updated Successfully !");
      
       return res.redirect("/feedback/view-feedback");
  
  } catch (error) {
    next(error);
  }
};

const addFeedbackById = async (req, res, next) => {
  try {
    
  
    const data = await new FeedbackManagement().addFeedbackById(
      
      req,
      res
    );
   
    req.flash("success_msg", "Feedback Updated Successfully !");
      
       return res.redirect("/feedback/view-feedback");
  
  } catch (error) {
    next(error);
  }
};

module.exports = {
 viewFeedback,getFeedback,updateFeedbackById,fetchFeedbackById,addFeedbackById,viewFeedbackById,deleteFeedback,deleteMultipleFeedback,createFeedback
 
};
