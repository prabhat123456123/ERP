
const isAuthenticatedUser = () => {
  return function (req, res, next) {
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
 
  isAuthenticatedUser,
};
