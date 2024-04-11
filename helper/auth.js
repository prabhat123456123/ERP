const { AuthManagement } = require("../services/admin");
const isAuthenticatedUser = () => {
  return async function (req, res, next) {
  
    const data = await new AuthManagement().getPaymentStatus(req, res);
     
    if (req.isAuthenticated()) { 
      const user = req.user;
      if (data.length) {
      
        return next();
      } else {
        res.redirect("/payment");
    }
    } else {
      // req.logout();
      // req.flash("error", "Not Authorized");
      res.redirect("/");
    }
  };
};

const checkPaymentStatus = () => {
  return async function (req, res, next) {
  
     
    if (req.isAuthenticated()) { 
      const user = req.user;
      return next();
    } else {
      // req.logout();
      // req.flash("error", "Not Authorized");
      res.redirect("/");
    }
  };
};

module.exports = {
 
  isAuthenticatedUser,checkPaymentStatus
};
