const winston = require("winston");
require("winston-daily-rotate-file");

// Dash logger
const dashLog = new winston.transports.DailyRotateFile({
	filename: "./logs/dash-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
});

const dash = winston.createLogger({
	transports: [
		dashLog,
		new winston.transports.Console({
			colorize: true,
		}),
	],
});

// Crew Logger
const crewLog = new winston.transports.DailyRotateFile({
	filename: "./logs/crew-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
});

const crew = winston.createLogger({
	transports: [
		crewLog,
		new winston.transports.Console({
			colorize: true,
		}),
	],
});

// Customer Logger
const custLogger = new winston.transports.DailyRotateFile({
	filename: "./logs/crew-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
});

const customer = winston.createLogger({
	transports: [
		custLogger,
		new winston.transports.Console({
			colorize: true,
		}),
	],
});

module.exports = {
	dashLogger: dash,
	crewLogger: crew,
	custLogger: customer,
};
