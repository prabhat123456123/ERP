const axios = require("axios");
const http = require("http");

const { PASSWORDSMS, ENDPOINT, KEY, SENDERID, USERNAMESMS, AUTHKEY } = process.env;
const { encryptedPassword, hashGenerator } = require("./message-helper");
console.log(ENDPOINT);
module.exports = {
	messenger: async (message, phone, DLT) => {
		try {
			if (process.env.NODE_ENV !== "production") {
				console.log(message);
				const msg = encodeURIComponent(message);
				const url = `http://api.msg91.com/api/sendhttp.php?route=4&sender=CBUCKT&mobiles=91${phone}&authkey=172372Anbk2vu0jf5ce270fe&message=${msg}&response=json&DLT_TE_ID=1207161980061554680`;
				http.get(url, function (resp) {
					resp.on("data", function (chunk) {
						console.log(chunk);
					});
				}).on("error", function (e) {
					console.log("Got error: " + e.message);
				});
			} else {
				const encPassword = encryptedPassword(PASSWORDSMS),
					templateId = DLT;

				let finalMessage = message.trim();

				// `प्रिय आवेदक, सिंगल विंडो क्लीयरेंस सिस्टम बिहार में आवेदन जमा करने के लिए आपका ओटीपी 1234 है। - उद्योग विभाग, बिहार सरकार`;

				// message.trim();

				const hash = await hashGenerator(USERNAMESMS, SENDERID, finalMessage, KEY);

				const query = `username=${USERNAMESMS}&password=${encPassword}&smsservicetype=otpmsg&content=${finalMessage}&mobileno=${phone}&senderid=${SENDERID}&key=${hash}&templateid=${templateId}`;

				// const query = `username=${USERNAMESMS}&password=${encPassword}&smsservicetype=unicodemsg&content=${finalMessage}&mobileno=${phone}&senderid=${SENDERID}&key=${hash}&templateid=1307163359510399314`;

				// console.log(query);
				// console.log(finalMessage);

				axios
					.post(ENDPOINT, query)
					.then(async resp => {
						console.log(resp.data);
					})
					.catch(function (error) {
						console.error(error);
						throw error;
					});
			}
		} catch (error) {
			console.log(error);
			return 0;
		}
	},
	generate: (lenght = 4) => {
		try {
			const string = "123456789";
			let OTP = "";
			const len = string.length;
			for (let i = 0; i < lenght; i++) {
				OTP += string[Math.floor(Math.random() * len)];
			}
			return OTP;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	govtMessage: async (message, phone, DLT) => {
		const encPassword = encryptedPassword(PASSWORDSMS);
		const templateId = DLT;
		const hash = await hashGenerator(USERNAMESMS, SENDERID, message.trim(), KEY);

		const query = `username=${USERNAMESMS}&password=${encPassword}&smsservicetype=otpmsg&content=${message.trim()}&mobileno=${phone}&senderid=${SENDERID}&key=${hash}&templateid=${templateId}`;

		axios
			.post(ENDPOINT, query)
			.then(async resp => {
				console.log(resp.data);
			})
			.catch(function (error) {
				console.error(error);
				throw error;
			});
	},
};
