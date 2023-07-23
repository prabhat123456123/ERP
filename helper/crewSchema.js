const Joi = require("joi");

const login = Joi.object({
	emailId: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).lowerCase(1).upperCase(1).required(),
});

module.exports = {
	"/crew/login/login": login,
};
