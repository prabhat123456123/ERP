const { getDate, addDate, updateFormat } = require("./time");
const { sendMail } = require("./mail");
const { camelize, generate,titletoslug } = require("./helper");
const { messenger } = require("./message");
const { hashPassword, compare } = require("./hash");
// const { host, user, database, password } = require("./constant");
const {
  generateRandomNumber,
  generateRandomPassword,
} = require("./generate-number");
const { formidableUpload, copyFiles, multiFileDownload } = require("./upload");
module.exports = {
  formidableUpload,
  copyFiles,
  getDate,
  updateFormat,
  generateRandomNumber,
  addDate,
  generate,
  messenger,
  titletoslug,
  camelize,
  hashPassword,
  compare,
  generateRandomPassword,
  sendMail,
};
