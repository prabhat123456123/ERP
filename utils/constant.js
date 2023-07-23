const dotenv = require("dotenv");

dotenv.config();

const CONSTANTS = {
  host:
    process.env.NODE_ENV === "DEV"
      ? "localhost"
      : process.env.NODE_ENV === "TEST"
      ? "localhost"
      : "localhost",
  user:
    process.env.NODE_ENV === "DEV"
      ? "root"
      : process.env.NODE_ENV === "TEST"
      ? "root"
      : "root",
  password:
    process.env.NODE_ENV === "DEV"
      ? ""
      : process.env.NODE_ENV === "TEST"
      ? ""
      : "",
  database:
    process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "TEST"
      ? "erp"
      : "erp",
  PORT:
    process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "TEST"
      ? 2098
      : 2098,
  APPPORT:
    process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "TEST"
      ? 5097
      : 5097,
  SECRET: "supersecret1234@",
  DOCUMENTURL:
    process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "TEST"
      ? "https://admin.biada.thecodebucket.com"
      : "https://admin.biada.thecodebucket.com",
  AUTHKEY: process.env.AUTHKEY,
  ENV: process.env.NODE_ENV,
  USERNAME: process.env.USERNAME,
  PASSWORDSMS: process.env.PASSWORD,
  ENDPOINT: process.env.ENDPOINT,
  KEY: process.env.KEY,
  SENDERID: process.env.SENDERID,
  RECAPTCHA: process.env.RECAPTCHA,
  SITEKEY: process.env.SITEKEY,
};

module.exports = CONSTANTS;
