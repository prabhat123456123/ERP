const camelcaseKeys = require("camelcase-keys");
const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const crypto = require("crypto");
const { MESSAGE_TEMPLATE_TYPES, SUCCESS } = require("../utils/constant");
const zeroPad = (num, places) => String(num).padStart(places, "0");
const { SIPB } = require("./constant");

const { getDate } = require("./time");
const { ErrorHandler } = require("../helper");
const { SERVER_ERROR } = require("../helper/status-codes");
const { sendMail } = require("./mail");
const { messenger } = require("./message");
const { fetchOtpTemplete } = require("../helper/otp-templete");

module.exports = {
	camelize: obj => {
		try {
			return camelcaseKeys(JSON.parse(JSON.stringify(obj)), { deep: true });
		} catch (error) {
			throw error;
		}
	},
	getToken: async (token, uId) => {
		try {
			const createdDate = getDate("YYYY-MM-DD HH:mm:ss");

			const resetToken = crypto.randomBytes(20).toString("hex"),
				resetPasswordExpires = Date.now() + 3600000; // 1 hr

			return resetToken;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(500, error);
		}
	},
	registrationNo: async type => {
		try {
			const year = getDate("YYYY"),
				month = getDate("MM");
			const regNo = await sequelize.query(
				"SELECT * FROM `investor_registration` WHERE created_date LIKE ? AND registration_no IS NOT NULL ORDER BY created_date DESC LIMIT 1",
				{
					replacements: [`%${year}%`],
					type: QueryTypes.SELECT,
				}
			);
			const reference =
				regNo.length > 0 ? regNo[0].registration_no.split(year) : ["", "000000"];

			const newRefNo = `${type}${year}${month}${zeroPad(
				parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1,
				6
			)}`;

			return newRefNo;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	applicationNo: async type => {
		try {
			const year = getDate("YY"),
				month = getDate("MM");

			let reference = "",
				regNo = [];

			if (type === SIPB) {
				regNo = await sequelize.query(
					"SELECT * FROM `caf` WHERE created_date LIKE ? ORDER BY `created_date` DESC LIMIT 1",
					{
						replacements: [`%${year}%`],
						type: QueryTypes.SELECT,
					}
				);
			} else {
				regNo = await sequelize.query(
					"SELECT registration_no AS 'application_no' FROM `investor_registration` WHERE created_date LIKE ? ORDER BY created_date DESC LIMIT 1",
					{
						replacements: [`%${year}%`],
						type: QueryTypes.SELECT,
					}
				);
			}
			reference =
				regNo.length > 0
					? regNo[0].application_no
						? regNo[0].application_no.split(`${type}${year}`)
						: ["", "000000"]
					: ["", "000000"];

			let newRefNo = `${type}${year}${month}${zeroPad(
				parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1,
				6
			)}`;

			let count = 1;

			let check = await sequelize.query("SELECT * FROM `caf` WHERE application_no = ?", {
				replacements: [newRefNo],
				type: QueryTypes.SELECT,
			});

			while (check.length > 0) {
				newRefNo = `${type}${year}${month}${zeroPad(
					parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1 + count,
					6
				)}`;
				count = count + 1;
				check = await sequelize.query("SELECT * FROM `caf` WHERE application_no = ?", {
					replacements: [newRefNo],
					type: QueryTypes.SELECT,
				});
			}

			return newRefNo;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	grievanceTrackingId: async type => {
		try {
			const year = getDate("YYYY"),
				month = getDate("MM");

			const regNo = await sequelize.query(
				"SELECT * FROM `grievance` WHERE created_date LIKE ? ORDER BY created_date DESC LIMIT 1",
				{
					replacements: [`%${year}%`],
					type: QueryTypes.SELECT,
				}
			);

			const reference = regNo.length > 0 ? regNo[0].tracking_no?.split(year) : ["", "000000"];

			const newRefNo = `SWCGRV${year}${month}${zeroPad(
				parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1,
				6
			)}`;
			return newRefNo;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	incentiveTrackingId: async type => {
		try {
			const year = getDate("YYYY"),
				month = getDate("MM");

			const regNo = await sequelize.query(
				"SELECT * FROM `incentives` WHERE created_date LIKE ? and final_submit = 'Yes' ORDER BY created_date DESC LIMIT 1",
				{
					replacements: [`%${year}%`],
					type: QueryTypes.SELECT,
				}
			);

			reference =
				regNo.length > 0
					? regNo[0].application_no
						? regNo[0].application_no.split(year)
						: ["", "000000"]
					: ["", "000000"];

			if (reference.length < 1) {
				reference = ["", "000000"];
			}

			let newRefNo = `INC${year}${month}${zeroPad(
				parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1,
				6
			)}`;

			let count = 1;

			let check = await sequelize.query(
				"SELECT * FROM `incentives` WHERE application_no = ?",
				{
					replacements: [newRefNo],
					type: QueryTypes.SELECT,
				}
			);

			while (check.length > 0) {
				newRefNo = `INC${year}${month}${zeroPad(
					parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1 + count,
					6
				)}`;
				count = count + 1;
				check = await sequelize.query(
					"SELECT * FROM `incentives` WHERE application_no = ?",
					{
						replacements: [newRefNo],
						type: QueryTypes.SELECT,
					}
				);
			}

			return newRefNo;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	licenseTrackingId: async type => {
		try {
			let prefix = await sequelize.query(
				'select prefix from `service_application_no_prefix` where service_type=?',
				{
					replacements: [type],
					type: QueryTypes.SELECT,
				}
				);
			prefix=prefix[0].prefix;
			const year = getDate("YYYY"),
				month = getDate("MM");

			const regNo = await sequelize.query(
				"SELECT * FROM `licenses` WHERE created_date LIKE ? and final_submit = 'Yes' ORDER BY created_date DESC LIMIT 1",
				{
					replacements: [`%${year}%`],
					type: QueryTypes.SELECT,
				}
			);

			reference =
				regNo.length > 0
					? regNo[0].application_no
						? regNo[0].application_no.split(year)
						: ["", "000000"]
					: ["", "000000"];

			if (reference.length < 1) {
				reference = ["", "000000"];
			}

			let newRefNo = `${prefix}${year}${month}${zeroPad(
				parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1,
				6
			)}`;

			let count = 1;

			let check = await sequelize.query(
				"SELECT * FROM `licenses` WHERE application_no = ?",
				{
					replacements: [newRefNo],
					type: QueryTypes.SELECT,
				}
			);

			while (check.length > 0) {
				newRefNo = `${prefix}${year}${month}${zeroPad(
					parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1 + count,
					6
				)}`;
				count = count + 1;
				check = await sequelize.query(
					"SELECT * FROM `licenses` WHERE application_no = ?",
					{
						replacements: [newRefNo],
						type: QueryTypes.SELECT,
					}
				);
			}

			return newRefNo;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	dopTrackingId: async type => {
		try {
			let prefix = await sequelize.query(
				'select prefix from `service_application_no_prefix` where service_type=?',
				{
					replacements: [type],
					type: QueryTypes.SELECT,
				}
				);
			prefix=prefix[0].prefix;
			const year = getDate("YYYY"),
				month = getDate("MM");

			const regNo = await sequelize.query(
				"SELECT * FROM `dops` WHERE created_date LIKE ? and final_submit = 'Yes' ORDER BY created_date DESC LIMIT 1",
				{
					replacements: [`%${year}%`],
					type: QueryTypes.SELECT,
				}
			);

			reference =
				regNo.length > 0
					? regNo[0].application_no
						? regNo[0].application_no.split(year)
						: ["", "000000"]
					: ["", "000000"];

			if (reference.length < 1) {
				reference = ["", "000000"];
			}

			let newRefNo = `${prefix}${year}${month}${zeroPad(
				parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1,
				6
			)}`;

			let count = 1;

			let check = await sequelize.query(
				"SELECT * FROM `dops` WHERE application_no = ?",
				{
					replacements: [newRefNo],
					type: QueryTypes.SELECT,
				}
			);

			while (check.length > 0) {
				newRefNo = `${prefix}${year}${month}${zeroPad(
					parseFloat(reference[1] ? reference[1].slice(2) : 0) + 1 + count,
					6
				)}`;
				count = count + 1;
				check = await sequelize.query(
					"SELECT * FROM `dops` WHERE application_no = ?",
					{
						replacements: [newRefNo],
						type: QueryTypes.SELECT,
					}
				);
			}

			return newRefNo;
		} catch (error) {
			console.error(error);
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	updateStatus: async (cafId, investorId) => {
		try {
			await sequelize.query(
				"UPDATE `caf` SET `doc_status` = `doc_status` + 1, `updated_by` = ? WHERE `caf_id` = ?",
				{
					replacements: [investorId, cafId],
					type: QueryTypes.UPDATE,
				}
			);
		} catch (error) {
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},
	saveLog: async (applicationId, serviceType, message, created_by) => {
		try {
			const [investor] = await sequelize.query(
				"SELECT * from `investor_registration` where `investor_id` = ?",
				{
					replacements: [created_by],
					type: sequelize.QueryTypes.SELECT,
				}
			);

			const email = investor.email;
			await sequelize.query(
				"INSERT INTO `logs` (`application_id`,`service_type`,`request_description`,`request_status`,`user_name`) VALUES (?,?,?,?,?)",
				{
					replacements: [applicationId, serviceType, message, "success", email],
					type: QueryTypes.INSERT,
				}
			);
		} catch (error) {
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},

	assigner: async (serviceType, subServiceType, applicationId) => {
		try {
			let assignedUser = null;
			let assignedRole = null;
			if(serviceType=='DOP') {
				let district = await sequelize.query(
					"SELECT d.district_desc from district d inner join unit u on u.district = d.district_name inner join dops on dops.unit_id = u.unit_id where dops.dop_id = ?",
					{
						replacements: [applicationId],
						type: QueryTypes.SELECT,
					}
				);

				if(district.length>0) {
					l = district[0].district_desc;
					l=l.replace(/ /g, '_');
					l=l.toLowerCase();
					let departmentUser = await sequelize.query(
						"SELECT * from `department_users` where department_username = ?",
						{
							replacements: [l],
							type: QueryTypes.SELECT,
						}
					);
					if(departmentUser.length>0) {
						assignedUser = departmentUser[0].department_user_id;
						assignedRole = 'GMDIC';
					}
				}
			} else {
				let [assignment] = await sequelize.query(
					`SELECT * FROM assignment WHERE service_type = ? and sub_service_type ${
						subServiceType ? "=" : "is"
					} ?`,
					{
						replacements: [serviceType, subServiceType],
						type: QueryTypes.SELECT,
					}
				);
				assignedUser = assignment.users[assignment.current_index];
				assignedRole = assignment.user_roles[assignment.current_index];
				let current_index = assignment.current_index + 1;
				if (current_index >= assignment.users.length) {
					current_index = 0;
				}
				await sequelize.query(
					`UPDATE assignment SET current_index = ? WHERE service_type = ? and sub_service_type ${
						subServiceType ? "=" : "is"
					} ?`,
					{
						replacements: [current_index, serviceType, subServiceType],
						type: QueryTypes.UPDATE,
					}
				);
			}
			let tableName = null;
			let columnName = null;

			switch (serviceType) {
				case "CAF1":
					tableName = "caf";
					columnName = "caf_id";
					break;
				case "FC":
					tableName = "fc";
					columnName = "fc_id";
					break;
				case "INC":
					tableName = "incentives";
					columnName = "incentive_id";
					break;
				case "L3":
					tableName = "licenses";
					columnName = "license_id";
					break;
				case "GRV":
						tableName = "grievance";
						columnName = "grievance_id";
						break;
				case "DOP":
							tableName = "dops";
							columnName = "dop_id";
							break;
			}

			await sequelize.query(
				"UPDATE `" +
					tableName +
					"` SET `assigned_to` = ?, `assigned_to_role` = ?, `stage` = 'Assignment' WHERE `" +
					columnName +
					"` = ?",
				{
					replacements: [assignedUser, assignedRole, applicationId],
					type: QueryTypes.UPDATE,
				}
			);

			await sequelize.query(
				"INSERT INTO workflow_transactions (application_id,service_type,assigned_to,assigned_to_role,action_status) VALUES(?,?,?,?,?)",
				{
					replacements: [
						applicationId,
						serviceType,
						assignedUser,
						assignedRole,
						"Pending",
					],
					type: QueryTypes.INSERT,
				}
			);
		} catch (error) {
			throw new ErrorHandler(SERVER_ERROR, error);
		}
	},

	updateSubmittedSections: async (applicationId, submittedSection, serviceType) => {
		let tableName = null;
		let columnName = null;

		if(serviceType.indexOf('L3') > -1) {
			tableName = 'licenses';
			columnName = 'license_id';
		} else
		switch (serviceType) {
			case "CAF1":
				tableName = "caf";
				columnName = "caf_id";
				break;
			case "FC":
				tableName = "fc";
				columnName = "fc_id";
				break;
			case "INC":
				tableName = "incentives";
				columnName = "incentive_id";
				break;
			case "DOP":
					tableName = "dops";
					columnName = "dop_id";
					break;
		}

		let submittedSections = await sequelize.query(
			`SELECT submitted_sections FROM ${tableName} WHERE ${columnName}=?`,
			{
				type: QueryTypes.SELECT,
				replacements: [applicationId],
			}
		);

		submittedSections = new Set(submittedSections[0].submitted_sections);

		submittedSections.add(submittedSection);

		submittedSections = [...submittedSections];

		await sequelize.query(
			`UPDATE ${tableName} SET submitted_sections = ? WHERE ${columnName}=?`,
			{
				type: QueryTypes.UPDATE,
				replacements: [JSON.stringify(submittedSections), applicationId],
			}
		);
	},

	mailPdf: async (investorId, cafId) => {
		const [referenceNo] = await sequelize.query(
			"SELECT application_no FROM `caf` WHERE caf_id = ?",
			{
				replacements: [cafId],
				type: QueryTypes.SELECT,
			}
		);

		const fileName = `./public/uploads/documents/${cafId}.pdf`;
		const [investor] = await sequelize.query(
			"SELECT * from `investor_registration` where `investor_id` = ?",
			{
				replacements: [investorId],
				type: sequelize.QueryTypes.SELECT,
			}
		);
		const email = investor.email;
		const phone = investor.phone;
		const dashboardUrl = `${process.env.BASEURL}investor/investor-home/dashboard`;

		const template = await fetchOtpTemplete(MESSAGE_TEMPLATE_TYPES.FINAL_SUBMIT_CAF_ONE);

		const DLT = template.DLT;
		const emailSubject = template.mailSubject;
		const emailTemplate = template.mail
			.replace("{{REF_NO}}", referenceNo.application_no)
			.replace("{{DASHBOARD_URL}}", dashboardUrl);
		const phoneTemplate = template.phone.replace("{{REF_NO}}", referenceNo.application_no);

		await sendMail(email, emailSubject, emailTemplate, [
			{
				filename: "SIPB Stage-I Approval.pdf",
				path: fileName,
			},
		]);

		await messenger(phoneTemplate, phone, DLT);

		return {
			message: SUCCESS,
		};
	},

	mailPdfIncentives: async (incentiveId, pdfType) => {
		try {
			console.log("incentiveId", incentiveId);
			const fileName = `./public/uploads/documents/${incentiveId}.pdf`;
			const [investorId] = await sequelize.query(
				"SELECT investor_id from `incentives` where `incentive_id` = ?",
				{
					replacements: [incentiveId],
					type: sequelize.QueryTypes.SELECT,
				}
			);

			const [investor] = await sequelize.query(
				"SELECT * from `investor_registration` where `investor_id` = ?",
				{
					replacements: [investorId.investor_id],
					type: sequelize.QueryTypes.SELECT,
				}
			);

			const email = investor.email;
			const phone = investor.phone;

			const template = await fetchOtpTemplete(MESSAGE_TEMPLATE_TYPES.FINAL_SUBMIT_TEST);
			const DLT = template.DLT;
			const emailSubject = template.mailSubject.replace("{{TYPE}}", pdfType);
			const emailTemplate = template.mail;
			const phoneTemplate = template.phone;

			await sendMail(email, emailSubject, emailTemplate, [
				{
					filename: "Incentive" + pdfType + ".pdf",
					path: fileName,
				},
			]);

			await messenger(phoneTemplate, phone, DLT);

			return {
				message: SUCCESS,
			};
		} catch (error) {
			console.log(error);
		}
	},

	mailPdfFc: async fcId => {
		const fileName = `./public/uploads/documents/${fcId}.pdf`;
		const [investorId] = await sequelize.query(
			"SELECT investor_id from `fc` where `fc_id` = ?",
			{
				replacements: [fcId],
				type: sequelize.QueryTypes.SELECT,
			}
		);

		const [investor] = await sequelize.query(
			"SELECT * from `investor_registration` where `investor_id` = ?",
			{
				replacements: [investorId.investor_id],
				type: sequelize.QueryTypes.SELECT,
			}
		);

		const email = investor.email;
		const phone = investor.phone;

		const template = await fetchOtpTemplete(MESSAGE_TEMPLATE_TYPES.FINAL_SUBMIT_TEST);
		const DLT = template.DLT;
		const emailSubject = template.mailSubject.replace("{{TYPE}}", "FC");
		const emailTemplate = template.mail;
		const phoneTemplate = template.phone;

		await sendMail(email, emailSubject, emailTemplate, [
			{
				filename: "FC.pdf",
				path: fileName,
			},
		]);

		await messenger(phoneTemplate, phone, DLT);

		return {
			message: SUCCESS,
		};
	},

	lockSections: async (applicationId, lockedSections, serviceType) => {
		let tableName = null;
		let columnName = null;
		if(serviceType.indexOf('L3') > -1) {
			tableName = 'licenses';
			columnName = 'license_id';
		} else
		switch (serviceType) {
			case "CAF1":
				tableName = "caf";
				columnName = "caf_id";
				break;
			case "FC":
				tableName = "fc";
				columnName = "fc_id";
				break;
			case "INC":
				tableName = "incentives";
				columnName = "incentive_id";
				break;
			case "DOP":
				tableName = "dops";
				columnName = "dop_id";
				break;
		}

		await sequelize.query(`UPDATE ${tableName} SET locked_sections = ? WHERE ${columnName}=?`, {
			type: QueryTypes.UPDATE,
			replacements: [JSON.stringify(lockedSections), applicationId],
		});
	},

	getPrevUnit: async body => {
		return await sequelize.query(
			"SELECT u2.unit_id, u.unit_status,c2.caf_id FROM unit u inner join " +
				"caf c on " +
				"u.unit_id=c.unit_id inner join unit u2 on " +
				"u2.unit_id=u.old_unit_id inner join caf c2 on " +
				"u2.unit_id = c2.unit_id where c.caf_id=?",
			{
				type: QueryTypes.SELECT,
				replacements: [body.cafId],
			}
		);
	},

	/**
	 * @param {string} investorId
	 * @returns User instance
	 */
	async getUserById(investorId) {
		try {
			const [investor] = await sequelize.query(
				"SELECT * FROM `investor_registration` where `investor_id` = ?",
				{
					type: QueryTypes.SELECT,
					replacements: [investorId],
				}
			);
			if (investor) return investor;
		} catch (error) {
			throw new ErrorHandler(error.statusCode ?? SERVER_ERROR, error.message);
		}
	},
};
