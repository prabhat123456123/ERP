const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// const Admin = require("../models/admin");
// const {
//   getUser,
//   getLoginUser,
//   getUserById,
//   getExeLogin,
//   getExeLoginUserById,
//   getLoginUserById,
// } = require("../service/login");

module.exports = function (passport) {
  passport.use(
    "admin",
    new LocalStrategy(async (username, password, done) => {
      const admin = await getUser(Admin, username);

      if (admin.length > 0) {
        bcrypt.compare(password, admin[0].password, (error, isMatch) => {
          if (error) console.error(error);
          if (isMatch) {
            console.log(admin);

            return done(null, admin[0]);
          } else {
            return done(null, false, {
              message: "Incorrect Password",
            });
          }
        });
      } else {
        return done(null, false, {
          message: "Incorrect username",
        });
      }
    })
  );
  passport.use(
    "pcc",
    new LocalStrategy(async (username, password, done) => {
      const admin = await getUser(Admin, username);
      // console.log(admin);

      if (admin.length > 0) {
        bcrypt.compare(password, admin[0].password, (error, isMatch) => {
          if (error) console.error(error);
          if (isMatch) {
            return done(null, admin[0]);
          } else {
            return done(null, false, {
              message: "Incorrect Password",
            });
          }
        });
      } else {
        return done(null, false, {
          message: "Incorrect username",
        });
      }
    })
  );
  // passport.use(
  //   "executive",
  //   new LocalStrategy(async (username, password, done) => {
  //     const admin = await getExeLogin(Admin, username);
  //     // console.log(admin);
  //     if (admin.length > 0) {
  //       bcrypt.compare(password, admin[0].password, (error, isMatch) => {
  //         if (error) console.error(error);
  //         if (isMatch) {
  //           // console.log(isMatch);
  //           return done(null, admin[0]);
  //         } else {
  //           return done(null, false, {
  //             message: "Incorrect Password",
  //           });
  //         }
  //       });
  //     } else {
  //       return done(null, false, {
  //         message: "Incorrect username",
  //       });
  //     }
  //   })
  // );
  // passport.use(
  //   "dgm",
  //   new LocalStrategy(async (username, password, done) => {
  //     const admin = await getLoginUser(Admin, username);
  //     // console.log(admin);
  //     if (admin.length > 0) {
  //       bcrypt.compare(password, admin[0].password, (error, isMatch) => {
  //         if (error) console.error(error);
  //         if (isMatch) {
  //           // console.log(isMatch);
  //           return done(null, admin[0]);
  //         } else {
  //           return done(null, false, {
  //             message: "Incorrect Password",
  //           });
  //         }
  //       });
  //     } else {
  //       return done(null, false, {
  //         message: "Incorrect username",
  //       });
  //     }
  //   })
  // );
  // passport.use(
  //   "ed",
  //   new LocalStrategy(async (username, password, done) => {
  //     const admin = await getLoginUser(Admin, username);
  //     // console.log(admin);
  //     if (admin.length > 0) {
  //       bcrypt.compare(password, admin[0].password, (error, isMatch) => {
  //         if (error) console.error(error);
  //         if (isMatch) {
  //           return done(null, admin[0]);
  //         } else {
  //           return done(null, false, {
  //             message: "Incorrect Password",
  //           });
  //         }
  //       });
  //     } else {
  //       return done(null, false, {
  //         message: "Incorrect username",
  //       });
  //     }
  //   })
  // );

  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, { uId: user.id, role: user.role });
  });

  passport.deserializeUser(async (uid, done) => {
    try {
      if (uid.role === "Admin") {
        const rows = await getUserById(Admin, uid.uId);
        if (rows) {
          done(null, rows);
        } else {
          done(null, null);
        }
      } else if (uid.role === "PCC Executive") {
        const rows = await getUserById(Admin, uid.uId);
        if (rows) {
          done(null, rows);
        } else {
          done(null, null);
        }
      }
      // else if (uid.role === "Executive") {
      //   const rows = await getExeLoginUserById(Admin, uid.uId);

      //   if (rows) {
      //     done(null, rows);
      //   } else {
      //     done(null, null);
      //   }
      // } else if (uid.role === "DGM") {
      //   const rows = await getLoginUserById(Admin, uid.uId);
      //   if (rows) {
      //     done(null, rows);
      //   } else {
      //     done(null, null);
      //   }
      // } else if (uid.role === "ED") {
      //   const rows = await getLoginUserById(Admin, uid.uId);
      //   // console.log(rows);

      //   if (rows) {
      //     done(null, rows);
      //   } else {
      //     done(null, null);
      //   }
      // }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};
