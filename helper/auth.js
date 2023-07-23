const { ErrorHandler } = require("./error");

module.exports = {
  ensureAuthenticatedAdmin: (types) => {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        const user = req.user;

        if (!types.includes(user.Role.RoleName)) {
          req.logout();
          req.flash("error", "Not Authorized");
          return res.redirect("/login");
        }
        return next();
      } else {
        req.logout();
        req.flash("error", "Not Authorized");
        res.redirect("/login");
      }
    };
  },
  checkUserType: function (types, token = true) {
    return function (req, res, next) {
      if (token) {
        const user = req.user;
        if (types.length) {
          if (!user || user.isAuth !== true)
            throw new ErrorHandler(401, "Not Authorized");

          //   if (!types.includes(user.type))
          //     throw new ErrorHandler(401, "Not Authorized");
        }
      }
      next();
    };
  },
  checkModule: (modules, type) => {
    return function (req, res, next) {
      const user = req.user;

      if (user.RoleID === 2) {
        return next();
      }

      if (!user.module.includes(modules)) {
        req.logout();
        req.flash("error", "Not Authorized");
        return res.redirect("/login");
      }

      const check = user.modules.find((user) => {
        return user.Module === modules;
      });

      if (type === "Write" && check.WriteRight === "Restricted") {
        req.logout();
        req.flash("error", "Not Authorized");
        return res.redirect("/login");
      }

      return next();
    };
  },
};
