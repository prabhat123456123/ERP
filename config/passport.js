const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const { AuthManagement } = require("../services/admin");

const {
  getSchool,
  
  getstudent,
  getTeacher,
} = require("../services/admin/auth");

module.exports = function (passport) {
  passport.use(
    "school",
    new LocalStrategy(async (username, password, done) => {
      const admin = await new AuthManagement().getSchool( username);
      if (admin.length > 0) {
        bcrypt.compare(password, admin[0].password, (error, isMatch) => {
          if (error) console.error(error);
          if (isMatch) {
            console.log(admin);

            return done(null, admin[0]);
          } else {
            return done(null, false, {
              message: "Invalid username or Password",
            });
          }
        });
      } else {
        return done(null, false, {
          message: "Invalid username or Password",
        });
      }
    })
  );
  passport.use(
    "student",
    new LocalStrategy(async (username, password, done) => {
      const admin = await new AuthManagement().getStudent( username);
      // console.log(admin);

      if (admin.length > 0) {
        bcrypt.compare(password, admin[0].password, (error, isMatch) => {
          if (error) console.error(error);
          if (isMatch) {
            return done(null, admin[0]);
          } else {
            return done(null, false, {
              message: "Invalid username or Password",
            });
          }
        });
      } else {
        return done(null, false, {
          message: "Invalid username or Password",
        });
      }
    })
  );
  
  passport.use(
    "faculty",
    new LocalStrategy(async (username, password, done) => {
      const admin = await new AuthManagement().getTeacher(username);
      // console.log(admin);
      if (admin.length > 0) {
        bcrypt.compare(password, admin[0].password, (error, isMatch) => {
          if (error) console.error(error);
          if (isMatch) {
            // console.log(isMatch);
            return done(null, admin[0]);
          } else {
            return done(null, false, {
              message: "Invalid username or Password",
            });
          }
        });
      } else {
        return done(null, false, {
          message: "Invalid username or Password",
        });
      }
    })
  );
  

  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, { uId: user.track_id, role: user.role });
  });

  passport.deserializeUser(async (uid, done) => {
    try {
    
      if (uid.role === "school") {
        const rows = await new AuthManagement().getSchoolId(uid.uId);
        
        if (rows) {
          done(null, rows);
        } else {
          done(null, null);
        }
      } else if (uid.role === "student") {
        const rows = await new AuthManagement().getStudentId( uid.uId);
        if (rows) {
          done(null, rows);
        } else {
          done(null, null);
        }
      }
      else if (uid.role === "faculty") {
        const rows = await new AuthManagement().getFacultyId( uid.uId);

        if (rows) {
          done(null, rows);
        } else {
          done(null, null);
        }
      }
      
      // else if (uid.role === "DGM") {
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
