const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");
const { customerfcmtoken, trainerfcmtoken, customernotificationlog, trainernotificationlog } =
	require("../../models/init-models")(sequelize);
const { GCMSENDER } = require("../../utils/Constant");
const gcm = require("node-gcm");
const { getDate } = require("./time");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
	notification: async function (type, senderId, body, subject) {
		try {
			const sender = new gcm.Sender(GCMSENDER),
				CreatedDate = getDate("YYYY-MM-DD HH:mm:ss");

			let fcmAll = [];

			if (type === "customer") {
				fcmAll = await customerfcmtoken.findAll({
					where: {
						CustomerID: {
							[Op.in]: [senderId],
						},
						Status: 0,
					},
				});
			} else if (type === "trainer") {
				fcmAll = await trainerfcmtoken.findAll({
					where: {
						TrainerID: {
							[Op.in]: [senderId],
						},
						Status: 0,
					},
				});
			} else {
				fcmAll = await trainerfcmtoken.findAll({
					where: {
						NutritionID: {
							[Op.in]: [senderId],
						},
						Status: 0,
					},
				});
			}

			const fcm = fcmAll.map(x => x.FirebaseToken);

			const message = new gcm.Message({
				notification: {
					title: subject,
					body: body,
				},
			});

			sender.send(
				message,
				{
					registrationTokens: fcm,
				},
				async function (error, response) {
					if (error) {
						console.error(error);
					} else {
						if (type === "customer") {
							for (let i = 0; i < senderId.length; i++) {
								await customernotificationlog.create({
									CustomerID: senderId[i],
									FCMTokenID: fcmAll[i].FirebaseToken,
									Subject: subject,
									Body: body,
									ChannelID: 3,
									status: 0,
									CreatedBy: senderId[i],
									CreatedDate: CreatedDate,
								});
							}
						} else if (type === "trainer") {
							for (let i = 0; i < senderId.length; i++) {
								await trainernotificationlog.create({
									TrainerID: senderId[i],
									FCMTokenID: fcmAll[i].FirebaseToken,
									Subject: subject,
									Body: body,
									ChannelID: 2,
									status: 0,
									CreatedBy: senderId[i],
									CreatedDate: CreatedDate,
								});
							}
						} else {
							for (let i = 0; i < senderId.length; i++) {
								await trainernotificationlog.create({
									NutritionID: senderId[i],
									FCMTokenID: fcmAll[i].FirebaseToken,
									Subject: subject,
									Body: body,
									ChannelID: 2,
									status: 0,
									CreatedBy: senderId[i],
									CreatedDate: CreatedDate,
								});
							}
						}
					}
				}
			);
		} catch (error) {
			console.error(error);
		}
	},
	notificationDash: async function (type, application, recipient, body, subject, recipientType) {
		try {
			const CreatedDate = getDate("YYYY-MM-DD HH:mm:ss");

			await sequelize.query(
				"INSERT INTO `dashboardnotification`(`applicationId`, `CustomerID`, `body`, `subject`, `status`, `type`, `created_by`, `created_date`) VALUES (?,?,?,?,?,?,?,?)",
				{
					replacements: [
						application,
						recipient,
						body,
						subject,
						0,
						type,
						recipientType,
						CreatedDate,
					],
					type: QueryTypes.SELECT,
				}
			);
			return CreatedDate;
		} catch (error) {
			console.error(error);
		}
	},
};
