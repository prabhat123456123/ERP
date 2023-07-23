const { dashLogger } = require("./logger");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (error, req, res) => {
  const { statusCode, message } = error;
  console.error(error);
  dashLogger.error(`Error : ${message},Request : ${req.originalUrl}`);
  if (statusCode === 500) {
    return res.status(statusCode).json({
      status: "Failure",
      msg: "Server Error",
    });
  }
  return;
};
module.exports = {
  ErrorHandler,
  handleError,
};
