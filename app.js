const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const cronJobs = require('./helper/job');
const session = require("express-session");

const passport = require("passport");
const flash = require("connect-flash");
const csrf = require("csurf");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");
const helmet = require("helmet");
const app = express();
require("dotenv").config({ path: `ecosystem.config.js` });
require("moment-timezone")().tz("Asia/Kolkata");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

const { admin } = require("./routes");
// const { validator, validateToken, handleError } = require("./middleware");
// const { handleError } = require("./middleware");

const {sequelize} = require("./models");
// const sequelize = require("./config/database");
// const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' });

// console.log("?????????????????????????",sequelize);

// Define your middleware function

app.use(express.json());
app
  // .use(logger("dev", { stream: accessLogStream }))
  .use(logger("dev"))
  .use(
    bodyParser.urlencoded({
      limit: "100mb",
      extended: true,
      parameterLimit: 50000,
    })
  )
  .use(bodyParser.json({ limit: "100mb" }))
  .use(cors())
  .use(helmet());
// app.use(helmet({
// contentSecurityPolicy: {
// directives: {
// defaultSrc: ["'self'"],
// 'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'","'unsafe-hashes'",  'https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js'],

// },
// },
// }));



// Middleware to generate nonce for each request
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Helmet middleware for Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"], // Remove the dynamic nonce
      scriptSrcAttr: ["'none'"], // Disallow inline scripts
      frameSrc: ["'self'", 'https://api.razorpay.com/'], // Allow framing from 'https://api.razorpay.com/'
      // Include the nonce in 'script-src' directive of CSP meta tag in HTML
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
    },
  }),
  
);


// app.use(`${process.env.URL_PREFIX?process.env.URL_PREFIX:''}/`, require('./routes'));
// const csrfProtection = csrf();
app.use(
  session({
    secret: "labourAdmin",
    name: "__sessionlabour",
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000, 
      expiration: 24 * 60 * 60 * 1000,
    }),
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PROD" ? true : false,
      proxy: true,
      sameSite: "lax",
      maxAge: 300000000, // 5 minutes in milliseconds
    },
    resave: false,
  })
);

// app.use(csrfProtection);

//   app.use(function (err, req, res, next) {
//     if (req.session._csrf) {
//       csrf(req, res, next);
//     } else {
//       next();
//     }
//   });
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
 

app.use((req, res, next) => {
  console.log(req.originalUrl);
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.header('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  //  res.locals.csrfToken = req.csrfToken();
    res.locals.user = req.user || null;

  next();
});

cronJobs();


// app.use((req, res, next) => {
// csrfProtection(req, res, (err) => {
// // Within this function, and now within all routes that follow,debug
// // we have access to req.csrfToken()

// if (req.path === "/user/trn-success" && err.code === "EBADCSRFTOKEN") {
// // We will ignore the specific CSRF error for this specific path
// // Notice how we are not passing err back to next()
// return next();
// } else {
// console.log(err);
// // Pass request along normally
// // If there is an error from CSRF or other middleware, it will be rethrown,
// // instead of being ignored
// next(err);
// }
// });
// });
// Middleware to set X-XSS-Protection header



app.use("/", admin);

app.use((err, req, res, next) => {
 
   const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
 // Get the caller function file name and line number
  // const callerFunction = err.stack.split('\n')[1];
  // const fileName = callerFunction.match(/\((.*):\d+:\d+\)/)[1];
  // const lineNumber = callerFunction.match(/:\d+:\d+\)$/)[0].slice(1, -1);
  
  // // Log the error to the access log file with file name and line number
  // accessLogStream.write(`[${new Date().toISOString()}] [${fileName}:${lineNumber}] [ERROR] ${statusCode} - ${message}\n`);
  //  handleError(err, res);
  // res.status(statusCode).json({ error: message });
});



// sequelize
//   .sync()
//   .then(() => {
//     console.log("database connecred !!!!");

//   })
//   .catch((err) => {
//     throw err;
//   });
module.exports = app;
