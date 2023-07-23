const Joi = require("joi");

const role = Joi.string();

const oAuth = Joi.object({
	email: Joi.string().email().required(),
});
const login = Joi.object({
	username: Joi.number().required(),
	password: Joi.string().alphanum().min(3).max(15).required(),
	role: role,
});
// const registration = Joi.object({
//   firstName: Joi.string().min(3).max(15).required(),
//   role: Joi.string().min(3).max(10).required(),
//   password: Joi.string().min(3).max(15).required(),
//   lastName: Joi.string().min(3).max(15).required(),
//   fatherName: Joi.string().min(3).max(15).required(),
//   phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
//   emailId: Joi.string().email().min(3).max(50).required(),
//   dob: Joi.date().raw().required(),
//   gender: Joi.string().required(),
//   height: Joi.number().integer().min(10).max(1000).required(),
//   weight: Joi.number().integer().min(10).max(1000).required(),
//   experience: Joi.number().integer().max(50).required(),
//   comments: Joi.string().min(3).max(15).required(),
//   referalCode: Joi.optional(),
// });
const bankdetail = Joi.object({
	role: Joi.string().min(3).max(10).required(),
	accountHolderName: Joi.string().min(3).max(15).required(),
	accountNumber: Joi.string().min(3).max(15).required(),
	accountType: Joi.number().integer().min(0).max(3).required(),
	bankId: Joi.number().integer().min(0).max(1000).required(),
	IFSCCode: Joi.string().min(3).max(15).required(),
	id: Joi.string().min(3).max(15).required(),
	role: role,
});

// const registrationDocument = Joi.object({
//   image: Joi.any().optional(),
//   trainerId: Joi.number().integer().min(1).max(100000000).required(),
// });
const upcommingSession = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	lat: Joi.string().min(3).max(15).required(),
	lng: Joi.string().min(3).max(15).required(),
	role: Joi.string().min(3).max(15).required(),
});
const fcm = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	firebaseToken: Joi.string().min(3).max(200).required(),
	imeiNumber: Joi.string().min(3).max(50).required(),
	role: role,
});
const reviewAdd = Joi.object({
	customerSessionId: Joi.number().integer().min(1).max(100000000).required(),
	rating: Joi.number().integer().max(5).required(),
	review: Joi.optional(),
	session: Joi.string().min(1).max(20).required(),
	role: role,
});
const scratch = Joi.object({
	customerSessionId: Joi.number().integer().min(1).max(100000000).required(),
	session: Joi.string().min(1).max(20).required(),
});
const excerciseAdd = Joi.object({
	customerSessionId: Joi.number().integer().min(1).max(100000000).required(),
	trainerExcerciseId: Joi.number().integer().min(1).max(1000000).required(),
	workoutLevelId: Joi.number().integer().min(1).max(1000000).required(),
	sets: Joi.number().integer().min(1).max(1000).required(),
	reps: Joi.number().integer().min(1).max(1000).required(),
	weights: Joi.number().integer().min(1).max(1000).required(),
	session: Joi.string().min(2).max(20).required(),
	role: role,
});
const qrcode = Joi.object({
	customerSessionId: Joi.number().integer().min(1).max(100000000).required(),
	sessionType: Joi.string().min(5).max(20).required(),
});
const payment = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	from: Joi.optional(),
	to: Joi.optional(),
});
const settlement = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	from: Joi.optional(),
	to: Joi.optional(),
});
const refund = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	from: Joi.optional(),
	to: Joi.optional(),
});
const viewPayment = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	from: Joi.date().required(),
	to: Joi.date().required(),
});
const paymentDetail = Joi.object({
	paymentId: Joi.number().integer().min(1).max(100000000).required(),
	role: role,
});
const sendOtp = Joi.object({
	phone: Joi.string().required(),
});
const verifyOtp = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	otp: Joi.string().min(1).max(1000).required(),
});
const updatePassword = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	newPassword: Joi.string().min(1).max(1000).required(),
});
const editProfile = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	firstName: Joi.string().min(1).max(1000).required(),
	lastName: Joi.string().min(1).max(1000).required(),
	fatherName: Joi.string().min(1).max(1000).required(),
	emailId: Joi.string().min(1).max(1000).required(),
	mobileNumber: Joi.number().integer().min(1).max(10000000000000).required(),
	dob: Joi.string().min(1).max(1000).required(),
	gender: Joi.number().integer().min(0).max(3).required(),
	weight: Joi.number().required(),
	height: Joi.number().required(),
});

const updateLocation = Joi.object({
	trainerId: Joi.number().integer().min(1).max(100000000).required(),
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
});

module.exports = {
	"/customer/login/oAuth": oAuth,
	"/crew/login/login": login,
	// "/crew/registration/registration": registration,
	"/crew/registration/bankdetail": bankdetail,
	//"/crew/registration/registrationDocument": registrationDocument,
	"/crew/session/upcommingSession": upcommingSession,
	"/crew/session/updateLocation": updateLocation,
	"/crew/fcmtoken/fcm": fcm,
	"/crew/ratingReview/reviewAdd": reviewAdd,
	"/crew/scratch/scratch": scratch,
	"/crew/excercise/excerciseAdd": excerciseAdd,
	"/crew/qrcode/qrcode": qrcode,
	"/crew/wallet/payment": payment,
	"/crew/wallet/settlement": settlement,
	"/crew/wallet/refund": refund,
	"/crew/wallet/viewPayment": viewPayment,
	"/crew/wallet/paymentDetail": paymentDetail,
	"/crew/resetPassword/sendOtp": sendOtp,
	"/crew/resetPassword/verifyOtp": verifyOtp,
	"/crew/resetPassword/updatePassword": updatePassword,
	"/crew/resetPassword/editProfile": editProfile,
};
