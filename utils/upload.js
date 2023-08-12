const util = require("util");
const fs = require("fs");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");
// const formidable = require("formidable");
const copyFilePromise = util.promisify(fs.copyFile);
// const { ErrorHandler, statusCodes } = require("../helper");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
// const NodeClam = require('clamscan');
// const { SERVER_ERROR, BAD_GATEWAY } = statusCodes;
const BASEURL = process.env.BASEURL;
const archiver = require("archiver");

const copyFiles = (srcDir, destDir, dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return copyFilePromise(srcDir, destDir);
};

const formidableUpload = async (req) => {
  try {
    let formidable;
    formidable = await import('formidable');
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    const formfields = await new Promise(function (resolve, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err);
          return;
        }

        resolve({ fields, files });
      }); // form.parse
    });
    return formfields;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  formidableUpload,
  copyFiles,
};
