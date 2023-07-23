const _ = require("lodash");
const Joi = require("joi");
const Schemas = require("./schemas");
const { ErrorHandler } = require("./error");

// enabled HTTP methods for request data validation
const _supportedMethods = ["post", "get"];

// Joi validation options
const _validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

const schemaValidator = async (req, res, next) => {
  const route = req.originalUrl;
  const method = req.method.toLowerCase();

  if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
    // get schema for the current route
    const _schema = _.get(Schemas, route);

    if (_schema) {
      try {
        const value = await _schema.validateAsync(req.body, _validationOptions);

        if (!req.body.role) {
          req.body.role = "Trainer";
        }

        if (req.body.role !== "Trainer" && req.body.role !== "Nutritionist") {
          next(new ErrorHandler(422, "Invalid role"));
        }
        next();
        return;
      } catch (error) {
        console.error(error);
        next(
          new ErrorHandler(
            422,
            "Invalid request data. Please review request and try again."
          )
        );
      }
    }
  }
  next();
};

module.exports = schemaValidator;
