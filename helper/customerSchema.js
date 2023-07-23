const Joi = require("joi");

const customerId = Joi.number().required();

// Login
const oAuth = Joi.object({
		email: Joi.string().email().required(),
	}),
	sendOTP = Joi.object({
		phone: Joi.number().required(),
	}),
	login = Joi.object({
		phone: Joi.number().required(),
		otp: Joi.string().required(),
	}),
	updatePassword = Joi.object({
		customerId: Joi.number().allow(null, ""),
		phone: Joi.string().allow(null, ""),
		password: Joi.string().required(),
	});

// Helper
const fcm = Joi.object({
		customerId: customerId,
		firebase: Joi.string().required(),
		imeiNumber: Joi.string().required(),
	}),
	notification = Joi.object({
		customerId: customerId,
		page: Joi.number().required(),
	}),
	refral = Joi.object({
		customerId: customerId,
	}),
	sleepTrack = Joi.object({
		customerId: customerId,
	}),
	addSleepTrack = Joi.object({
		customerId: customerId,
		sleep: Joi.string(),
		wake: Joi.string(),
		reminder: Joi.boolean().required(),
	}),
	addSleep = Joi.object({
		customerId: customerId,
		sleepTime: Joi.string(),
	}),
	calories = Joi.object({
		customerId: customerId,
		calories: Joi.number().required(),
		type: Joi.string().required(),
	});

// Registration
const registration = Joi.object({
		phone: Joi.number().required(),
		firstName: Joi.string().required(),
		emailId: Joi.string().email().required(),
		referalCode: Joi.string().allow(null, ""),
	}),
	verifyOTP = Joi.object({
		phone: Joi.number().required(),
		otp: Joi.number().required(),
	}),
	profile = Joi.object({
		customerId: customerId,
		url: Joi.string(),
	});

// Address
const getAddress = Joi.object({
		customerId: customerId,
	}),
	addAddress = Joi.object({
		customerId: customerId,
		addressType: Joi.number().required(),
		addressLine1: Joi.string().required(),
		addressLine2: Joi.string().required(),
		landmark: Joi.string(),
		stateId: Joi.number().required(),
		districtId: Joi.number(),
		cityId: Joi.number().required(),
		zip: Joi.number().required(),
		latitude: Joi.number().required(),
		longitude: Joi.number().required(),
	}),
	updateAddress = Joi.object({
		customerAddressId: Joi.number().required(),
		addressLine1: Joi.string().required(),
		stateId: Joi.number().required(),
		districtId: Joi.number().required(),
		cityId: Joi.number().required(),
		zipId: Joi.number().required(),
		latitude: Joi.number().required(),
		longitude: Joi.number().required(),
	}),
	deleteAddress = Joi.object({
		customerAddressId: Joi.number().required(),
	});

// Trainer
const getTrainer = Joi.object({
		skillId: Joi.array(),
		serviceId: Joi.array(),
		gender: Joi.array(),
		search: Joi.string().allow(null, ""),
		lat: Joi.number().required(),
		lng: Joi.number().required(),
		distance: Joi.number().required(),
	}),
	trainerDetails = Joi.object({
		type: Joi.string().required(),
		trainerId: customerId,
	}),
	getPackage = Joi.object({
		trainerId: customerId,
		trainerServiceId: Joi.number().required(),
		trainerPackageTypeId: Joi.number().required(),
		role: Joi.string().required(),
	}),
	addFav = Joi.object({
		trainerId: customerId,
		customerId: customerId,
	}),
	getFav = Joi.object({
		customerId: customerId,
	});

// Booking
const getCoupons = Joi.object({
		packageId: Joi.array(),
		serviceId: Joi.array(),
		sessionType: Joi.string().required().allow(null, ""),
		customerId: customerId,
	}),
	createOrder = Joi.object({
		customerId: customerId,
		finalAmount: Joi.number().required(),
		payment: Joi.array().required(),
		order: Joi.array().allow(null, ""),
	}),
	paymentDetails = Joi.object({
		customerOrderId: customerId,
		finalAmount: Joi.number().required(),
		payment: Joi.array().required(),
		trainerServiceId: Joi.number().required(),
		trainerPackageId: Joi.number().required(),
		trainerPackageTypeId: Joi.number().required(),
		role: Joi.string().required(),
	});

// Session
const getCancelledSession = Joi.object({
		customerId: customerId,
	}),
	getCompletedSession = Joi.object({
		customerId: customerId,
	}),
	getCurrentSession = Joi.object({
		customerId: customerId,
	}),
	sessiontDetails = Joi.object({
		customerId: customerId,
		sessionType: Joi.string().required(),
		sessionId: Joi.number().required(),
	});

module.exports = {
	"/customer/login/oAuth": oAuth,
	"/customer/login/sendOTP": sendOTP,
	"/customer/login/login": login,
	"/customer/login/update-password": updatePassword,
	"/customer/helper/fcm": fcm,
	"/customer/helper/get-notification": notification,
	"/customer/helper/get-referalCode": refral,
	"/customer/helper/add-sleep-tracker": addSleepTrack,
	"/customer/helper/add-calories": calories,
	"/customer/helper/add-sleep": addSleep,
	"/customer/registration/registration": registration,
	"/customer/registration/verify-otp": verifyOTP,
	"/customer/registration/profile": profile,
	"/customer/address/getAddress": getAddress,
	"/customer/address/addAddress": addAddress,
	"/customer/address/updateAddress": updateAddress,
	"/customer/address/deleteAddress": deleteAddress,
	"/customer/trainer/trainer-list": getTrainer,
	// "/customer/trainer/trainer-details": trainerDetails,
	"/customer/trainer/trainer-package": getPackage,
	"/customer/trainer/add-fav": addFav,
	"/customer/trainer/view-fav": getFav,
	"/customer/booking/coupons": getCoupons,
	"/customer/booking/trainer-order": createOrder,
	"/customer/booking/payment-details": paymentDetails,
	"/customer/session/session-details": sessiontDetails,
	"/customer/session/completed-session": getCompletedSession,
	"/customer/session/cancelled-session": getCancelledSession,
	"/customer/session/current-session": getCurrentSession,
};
