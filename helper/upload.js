const util = require("util");
const fs = require("fs");
const path = require("path");
const copyFilePromise = util.promisify(fs.copyFile);

module.exports = {
	copyFiles: (srcDir, destDir) => {
		return copyFilePromise(srcDir, destDir);
	},
};
